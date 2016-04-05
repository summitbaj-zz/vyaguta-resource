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

    private Configuration() {
        try {
            InputStream stream = getClass().getResourceAsStream("/" + configFile);

            properties = new Properties();
            properties.load(stream);

            setAuthUrl(properties.getProperty("AUTH_URL"));
            setVyagutaCoreUrl(properties.getProperty("VYAGUTA_CORE_URL"));

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

    private String authUrl;
    private String vyagutaCoreUrl;

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
}
