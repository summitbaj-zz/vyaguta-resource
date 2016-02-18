package com.lftechnology.vyaguta.commons.dao;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;

/**
 * @author Anish Krishna Manandhar<anishmanandhar@lftechnology.com>
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public abstract class BaseDao {

    @Inject
    protected EntityManager em;

    /**
     * Construct proper dao exception messages
     * 
     * @param throwable
     * @return
     */
    public static ErrorMessage constructErrorMessage(Throwable throwable) {
        String message = ExceptionUtils.getRootCauseMessage(throwable);
        ErrorMessage errorMessage = new ErrorMessage( message);
        if (message.contains("duplicate key value violates unique constraint")) {
            message = StringUtils.substringAfter(message, "Detail: Key ");
            String[] messages = message.split("=");
            if (messages != null && messages.length > 1) {
                errorMessage.setError(messages[1]);
            }
        }
        return errorMessage;
    }
}
