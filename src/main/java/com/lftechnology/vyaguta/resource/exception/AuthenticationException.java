package com.lftechnology.vyaguta.resource.exception;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class AuthenticationException extends RuntimeException {

    private static final long serialVersionUID = -9001449743014989332L;

    public AuthenticationException() {
        super("Un-authorized access");
    }

    public AuthenticationException(String message) {
        super(message);
    }

}
