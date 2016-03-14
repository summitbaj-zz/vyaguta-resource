package com.lftechnology.vyaguta.resource.exception;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class BadQueryFormatException extends RuntimeException {

    private static final long serialVersionUID = -6394925451874733952L;

    public BadQueryFormatException() {

    }

    public BadQueryFormatException(String message) {
        super(message);
    }

}
