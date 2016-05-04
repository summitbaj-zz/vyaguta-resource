package com.lftechnology.vyaguta.resource.service;

import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectNotificationService {

    /**
     * Method which includes task to be run at scheduled time
     * 
     */
    public void pushNotification();

    public String emailBuilder(Contract contract);
}
