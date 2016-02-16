package com.lftechnology.vyaguta.commons.dao;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessageWithAttribute;

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
        ErrorMessageWithAttribute errorMessage = new ErrorMessageWithAttribute("error", message);
        if (message.contains("duplicate key value violates unique constraint")) {
            message = StringUtils.substringAfter(message, "Detail: Key ");
            String[] messages = message.split("=");
            if (messages != null && messages.length > 1) {
                errorMessage.setField(messages[0].replaceAll("\\(", "").replaceAll("\\)", ""));
                errorMessage.setError(messages[1]);
            }
        }
        return errorMessage;
    }
}
