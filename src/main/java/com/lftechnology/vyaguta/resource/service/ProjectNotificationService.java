package com.lftechnology.vyaguta.resource.service;

import javax.ejb.Timer;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface NotificationService {

    /**
     * Method used to define schedule
     */
    public void init();

    /**
     * Method which includes task to be run at scheduled time
     * 
     * @param {{@link
     *            Timer}
     */
    public void routineJob(Timer timer);
}
