package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.pojo.ResponseData;
import com.lftechnology.vyaguta.commons.util.ArrayUtil;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.EmailService;
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

    @Inject
    private EmailService emailService;

    @Named("vyaguta")
    private Logger log;

    @Override
    public void notifyPriorEndDate() {
        LocalDate date = LocalDate.now().plusDays(Configuration.instance().getEndingNotificationDays());
        List<Contract> contracts = projectService.findContractsEndingBefore(date);
        this.validateAccountManagerAndPushNotification(contracts, EmailServiceImpl.CONTRACT_ENDING_EMAIL_TEMPLATE);
    }

    @Override
    public void notifyAtferEndDate() {
        // TODO put code here
    }

    private void validateAccountManagerAndPushNotification(List<Contract> contracts, String templateName) {
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

            final String body = emailService.emailBuilder(contract, templateName);
            emailService.sendMail(mailTo, body);
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
        if (response.getStatus() == Status.OK.getStatusCode()) {
            return response.readEntity(entityType);
        } else {
            throw new WebApplicationException(response);
        }
    }

}