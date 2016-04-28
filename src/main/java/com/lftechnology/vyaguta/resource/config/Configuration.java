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

    private Configuration() {
        try {
            InputStream stream = getClass().getResourceAsStream("/" + configFile);

            properties = new Properties();
            properties.load(stream);

            setAuthUrl(properties.getProperty("AUTH_URL"));
            setVyagutaCoreUrl(properties.getProperty("VYAGUTA_CORE_URL"));
            setProjectPageViewPage(properties.getProperty("PROJECT_VIEW_PAGE"));

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
}
