package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import com.lftechnology.vyaguta.commons.pojo.ResponseData;
import com.lftechnology.vyaguta.commons.util.ArrayUtil;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.ProjectNotificationService;
import com.lftechnology.vyaguta.resource.service.ProjectService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Singleton
public class ProjectNotificationServiceImpl implements ProjectNotificationService {

    private static final String EMPLOYEE_URL = Configuration.instance().getVyagutaCoreUrl() + "employees";

    @Inject
    private ProjectService projectService;

    @Resource(lookup = "java:jboss/mail/ses")
    private Session session;

    @Inject
    @Named("vyaguta")
    private Logger log;

    @Override
    public void pushNotification() {
        // days before contract ending to send notification
        LocalDate date = LocalDate.now().plusDays(Configuration.instance().getEndingNotificationDays());

        List<Contract> contracts = projectService.findContractsEndingBefore(date);
        for (Contract contract : contracts) {
            if (contract.getProject().getAccountManager() == null) {
                continue;
            }
            this.fetchAndMergeAccountManager(contract);
            this.fetchAndMergeEmployee(contract);
            String mailTo = contract.getProject().getAccountManager().getPrimaryEmail();
            if (mailTo == null) {
                continue;
            }

            final String body = this.emailBuilder(contract);
            this.sendMail(mailTo, body);
        }
    }

    private void sendMail(String mailTo, String body) {
        String from = "noreply@lftechnology.com";
        String subject = "Project Ending Reminder";

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(mailTo));
            message.setSubject(subject);
            message.setContent(body, "text/html");
            Transport.send(message);
        } catch (MessagingException mex) {
            log.error("{}", mex.getMessage());
        }
    }

    private List<Employee> fetchEmployees(List<UUID> employeeIds) {

        ResponseData<Employee> data = this.getEmployeeFromCore(employeeIds, new GenericType<ResponseData<Employee>>() {
        });
        return data.getData();
    }

    private <T> T getEmployeeFromCore(List<UUID> employeeIds, GenericType<T> entityType) throws WebApplicationException {
        String url = EMPLOYEE_URL + "?id=" + ArrayUtil.toCommaSeparated(employeeIds);
        String clientId = Configuration.instance().getClientId();
        String clientSecret = Configuration.instance().getClientSecret();

        Client client = ClientBuilder.newClient();
        Response response = client.target(url).request().header("X-Client-Id", clientId).header("X-Client-Secret", clientSecret)
                .get(Response.class);
        if (response.getStatus() == 200) {
            return response.readEntity(entityType);
        } else {
            throw new WebApplicationException(response);
        }
    }

    private void fetchAndMergeAccountManager(Contract contract) {
        List<Employee> employees = this.fetchEmployees(Arrays.asList(contract.getProject().getAccountManager().getId()));
        if (employees.isEmpty()) {
            return;
        }
        contract.getProject().setAccountManager(employees.get(0));
    }

    private void fetchAndMergeEmployee(Contract contract) {
        List<UUID> employeeIds = new ArrayList<>();
        for (ContractMember cm : contract.getContractMembers()) {
            if (cm.getEmployee().getId() != null) {
                employeeIds.add(cm.getEmployee().getId());
            }
        }

        if (!employeeIds.isEmpty()) {
            List<Employee> employees = this.fetchEmployees(employeeIds);
            for (ContractMember cm : contract.getContractMembers()) {
                for (Employee employee : employees) {

                    if (cm.getEmployee().getId().equals(employee.getId())) {
                        cm.setEmployee(employee);
                    }
                }
            }
        }
    }

    @Override
    public String emailBuilder(Contract contract) {
        String projectViewPageLink = Configuration.instance().getProjectPageViewPage() + contract.getProject().getId() + "/view";

        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setTemplateMode("HTML5");
        resolver.setSuffix(".html");
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(resolver);
        final Context context = new Context(Locale.ENGLISH);
        context.setVariable("contract", contract);
        context.setVariable("linkToProjectPageLink", projectViewPageLink);
        return templateEngine.process("email", context);
    }

}