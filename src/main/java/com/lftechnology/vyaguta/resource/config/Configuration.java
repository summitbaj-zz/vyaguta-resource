package com.lftechnology.vyaguta.resource.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class Configuration {

    private static Configuration instance;
    private String configFile = "config.properties";
    private Properties properties;

    private String authUrl;
    private String vyagutaCoreUrl;
    private String projectPageViewPage;
    private Integer endingNotificationDays;
    private String clientId;
    private String clientSecret;
    private Integer sendEmailAtHour;
    private Integer sendEmailAtMinute;

    private Configuration() {
        try {
            InputStream stream = getClass().getResourceAsStream("/" + configFile);

            properties = new Properties();
            properties.load(stream);

            setAuthUrl(properties.getProperty("AUTH_URL"));
            setVyagutaCoreUrl(properties.getProperty("VYAGUTA_CORE_URL"));
            setProjectPageViewPage(properties.getProperty("PROJECT_VIEW_PAGE"));
            setEndingNotificationDays(Integer.parseInt(properties.getProperty("ENDING_NOTIFICATION_DAYS")));
            setClientId(properties.getProperty("CLIENT_ID"));
            setClientSecret(properties.getProperty("CLIENT_SECRET"));
            setSendEmailAtHour(Integer.parseInt(properties.getProperty("SEND_EMAIL_AT_HOUR")));
            setSendEmailAtMinute(Integer.parseInt(properties.getProperty("SEND_EMAIL_AT_MINUTE")));

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public static Configuration instance() {
        if (instance == null) {
            instance = new Configuration();
        }
        return instance;
    }

    public String getAuthUrl() {
        return authUrl;
    }

    public void setAuthUrl(String authUrl) {
        this.authUrl = authUrl;
    }

    public String getVyagutaCoreUrl() {
        return vyagutaCoreUrl;
    }

    public void setVyagutaCoreUrl(String vyagutaCoreUrl) {
        this.vyagutaCoreUrl = vyagutaCoreUrl;
    }

    public String getProjectPageViewPage() {
        return projectPageViewPage;
    }

    public void setProjectPageViewPage(String projectPageViewPage) {
        this.projectPageViewPage = projectPageViewPage;
    }

    public Integer getEndingNotificationDays() {
        return endingNotificationDays;
    }

    public void setEndingNotificationDays(Integer endingNotificationDays) {
        this.endingNotificationDays = endingNotificationDays;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public Integer getSendEmailAtHour() {
        return sendEmailAtHour;
    }

    public void setSendEmailAtHour(Integer sendEmailAtHour) {
        this.sendEmailAtHour = sendEmailAtHour;
    }

    public Integer getSendEmailAtMinute() {
        return sendEmailAtMinute;
    }

    public void setSendEmailAtMinute(Integer sendEmailAtMinute) {
        this.sendEmailAtMinute = sendEmailAtMinute;
    }

}
