package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.ScheduleExpression;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.Timeout;
import javax.ejb.Timer;
import javax.ejb.TimerService;
import javax.inject.Inject;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.core.GenericType;

import com.lftechnology.vyaguta.commons.http.HttpHelper;
import com.lftechnology.vyaguta.commons.pojo.ResponseData;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.NotificationService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@LocalBean
@Singleton
@Startup
public class NotificationServiceImpl implements NotificationService {

    private static final String EMPLOYEE_URL = Configuration.instance().getVyagutaCoreUrl() + "employees";

    @Inject
    private ContractDao contractDao;

    @Resource(lookup = "java:jboss/mail/ses")
    private Session session;

    @Resource
    TimerService timerService;

    @Override
    @PostConstruct
    public void init() {
        timerService.createCalendarTimer(new ScheduleExpression().month("*").dayOfWeek("MON-FRI").hour("17").minute("17"));
    }

    @Override
    @Timeout
    public void routineJob(Timer timer) {
        // set 7 days before contract ending to send notification
        LocalDate date = LocalDate.now().plusDays(2);

        List<Contract> contracts = contractDao.findEndingContracts(date);

        for (Contract contract : contracts) {
            List<Employee> accountManagers = this.restCall(contract.getProject().getAccountManager().getId());
            if (accountManagers.isEmpty()) {
                continue;
            }

            String accountManagerName = accountManagers.get(0).getFirstName();
            String mailTo = accountManagers.get(0).getPrimaryEmail();
            String body = this.constructEmailBody(accountManagerName, contract);

            // this.sendMail(mailTo, body);
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
            mex.printStackTrace();
        }
    }

    private String constructEmailBody(String accountManagerName, Contract contract) {
        String startDate = contract.getStartDate().toString();
        String endDate = contract.getEndDate().toString();
        String project = contract.getProject().getTitle();

        String body = "Dear " + accountManagerName + ",";
        body += "\nThe contract of project " + project + " is going to end soon. Please find the details below:";
        body += "\nProject Name: " + project;
        body += "\nProject Start Date: " + startDate;
        body += "\nProject End Date:" + endDate;

        return body;
    }

    private List<Employee> restCall(UUID id) {
        String url = EMPLOYEE_URL + "?id=" + id;
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xmdGVjaG5vbG9neS5jb20iLCJzdWIiOiJleUpwWkNJNklqQXhOalUyTWpJeUxXRTRNVGd0TkRFMlppMDVNamsyTFRBM1kyUXdOMk14T0dNek5DSXNJbVZ0WVdsc0lqb2liMjVsXHJcblFHOXVaUzVqYjIwaUxDSnVZVzFsSWpwdWRXeHNMQ0poZG1GMFlYSWlPbTUxYkd3c0luVnpaWEpUZEdGMGRYTWlPakVzSW1OeVpXRjBcclxuWldSQmRDSTZJakl3TVRZdE1EUXRNakFnTVRBNk1UYzZNalFpTENKMWNHUmhkR1ZrUVhRaU9tNTFiR3dzSW5KdmJHVnpJanBiZXlKcFxyXG5aQ0k2SW1WaE5UQTVNakppTFdSak1UQXRORFUxTmkxaVltWmtMVE13TUdJMU16ZzFOREkyTUNJc0luSnZiR1VpT2lKQlpHMXBiaUlzXHJcbkltTnlaV0YwWldSQmRDSTZJakl3TVRZdE1ETXRNekVnTVRjNk5UazZNeklpTENKMWNHUmhkR1ZrUVhRaU9tNTFiR3g5TEhzaWFXUWlcclxuT2lKbFlUVXdPVEl5WWkxa1l6RXdMVFExTlRZdFltSm1aQzB6TURCaU5UTTROVFF5TmpFaUxDSnliMnhsSWpvaVJXMXdiRzk1WldVaVxyXG5MQ0pqY21WaGRHVmtRWFFpT2lJeU1ERTJMVEEwTFRJd0lERXdPakUxT2pNMklpd2lkWEJrWVhSbFpFRjBJanB1ZFd4c2ZWMTlcclxuIiwiYXVkIjoiMSIsImV4cCI6MTQ2MTk0MDM3NCwiaWF0IjoxNDYxMzM1NTc0fQ.lCezG4EzVkUwEtxoqCMP0MMzgp5cOwCeVHaSA9-4unM";
        ResponseData<Employee> data = HttpHelper.get(url, token, new GenericType<ResponseData<Employee>>() {
        });
        return data.getData();
    }

    public void cancelMyTimer() {
        for (Object obj : timerService.getAllTimers()) {
            Timer timer = (Timer) obj;
            timer.cancel();
        }
    }
}