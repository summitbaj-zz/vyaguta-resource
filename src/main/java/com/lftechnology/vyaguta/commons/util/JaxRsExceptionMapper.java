package com.lftechnology.vyaguta.commons.util;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ValidationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.commons.lang3.StringUtils;
import org.jboss.resteasy.api.validation.ResteasyConstraintViolation;
import org.jboss.resteasy.api.validation.ResteasyViolationException;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessageWithAttribute;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
public class JaxRsExceptionMapper implements ExceptionMapper<ValidationException> {

  @Override
  public Response toResponse(ValidationException e) {
    if (e instanceof ResteasyViolationException) {
      List<ErrorMessage> errorMessages = new ArrayList<ErrorMessage>();
      ResteasyViolationException cve = (ResteasyViolationException) e;
      for (ResteasyConstraintViolation rcv : cve.getViolations()) {
        ErrorMessage msg = new ErrorMessage(extractFieldName(rcv.getMessage()));
        errorMessages.add(msg);
      }
      return Response.status(Status.BAD_REQUEST).entity(errorMessages).type(MediaType.APPLICATION_JSON).build();
    }
    ErrorMessageWithAttribute msg = new ErrorMessageWithAttribute(null, e.getMessage());
    return Response.serverError().entity(msg).type(MediaType.APPLICATION_JSON).build();
  }

  protected static String extractFieldName(String compositeField) {
    String[] fieldName = compositeField.split("\\.");
    if (fieldName.length > 2) {
      return StringUtils.substringAfter(compositeField, fieldName[0] + "." + fieldName[1] + ".");
    }
    return compositeField;
  }
}
