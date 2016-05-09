package com.lftechnology.vyaguta.resource.service;

import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface EmailService {

    String emailBuilder(Contract contract, String templateName);

    void sendMail(String mailTo, String body);
}
