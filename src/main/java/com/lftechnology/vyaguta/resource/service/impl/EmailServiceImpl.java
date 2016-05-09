package com.lftechnology.vyaguta.resource.service.impl;

import java.util.Locale;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.service.EmailService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class EmailServiceImpl implements EmailService {

    public static final String CONTRACT_ENDING_EMAIL_TEMPLATE = "contract-ending-email-template";
    public static final String CONTRACT_ENDED_EMAIL_TEMPLATE = "contract-ended-email-template";
    public static final String EMAIL_SENDER_ADDRESS = Configuration.instance().getNotificationEmailFrom();

    @Inject
    private Logger log;

    @Resource(lookup = "java:jboss/mail/ses")
    private Session session;

    @Override
    public String emailBuilder(final Contract contract, String templateName) {
        String projectViewPageLink = Configuration.instance().getProjectPageViewPage() + contract.getProject().getId() + "/view";
        boolean isReleasingResourceEmpty = true;
        for (ContractMember cm : contract.getContractMembers()) {
            if (cm.getEndDate().equals(contract.getEndDate())) {
                isReleasingResourceEmpty = false;
                break;
            }
        }
        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setTemplateMode("HTML5");
        resolver.setSuffix(".html");
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(resolver);
        final Context context = new Context(Locale.ENGLISH);
        context.setVariable("contract", contract);
        context.setVariable("isReleasingResourceEmpty", isReleasingResourceEmpty);
        context.setVariable("linkToProjectPage", projectViewPageLink);
        return templateEngine.process(templateName, context);
    }

    @Override
    public void sendMail(String mailTo, String body) {
        String subject = "Project Ending Reminder";

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(EMAIL_SENDER_ADDRESS));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(mailTo));
            message.setSubject(subject);
            message.setContent(body, "text/html");
            Transport.send(message);
        } catch (MessagingException mex) {
            log.error("{}", mex.getMessage());
        }
    }

}
