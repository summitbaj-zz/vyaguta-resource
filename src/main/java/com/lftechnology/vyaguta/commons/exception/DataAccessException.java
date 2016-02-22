package com.lftechnology.vyaguta.commons.exception;

/**
 * 
 * @author Anish Krishna Manandhar<anishmanandhar@lftechnology.com>
 *
 */
public class DataAccessException extends RuntimeException {

    private static final long serialVersionUID = 6861905171352749089L;

    public DataAccessException(String message) {
        super(message);
    }

    public DataAccessException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
