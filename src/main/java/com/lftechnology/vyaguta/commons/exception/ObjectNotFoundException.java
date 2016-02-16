package com.lftechnology.vyaguta.commons.exception;

/**
 * 
 * @author achyut <achyutpokhrel@lftechnology.com>
 *
 */
public class ObjectNotFoundException extends RuntimeException {

  private static final long serialVersionUID = 7213834010317372624L;

  public ObjectNotFoundException() {
    super("No row with the given identifier.");
  }

  public ObjectNotFoundException(String message) {
    super(message);
  }

  public ObjectNotFoundException(String message, Throwable throwable) {
    super(message, throwable);
  }
}
