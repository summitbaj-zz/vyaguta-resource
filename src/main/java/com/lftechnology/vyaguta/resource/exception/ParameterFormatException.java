package com.lftechnology.vyaguta.resource.exception;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ParameterFormatException extends RuntimeException {

    private static final long serialVersionUID = -6394925451874733952L;

    public ParameterFormatException() {

    }

    public ParameterFormatException(String message) {
        super(message);
    }

}
