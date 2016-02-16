package com.lftechnology.vyaguta.commons.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */

@Provider
public class DataAccessExceptionMapper implements ExceptionMapper<DataAccessException> {

  @Override
  public Response toResponse(DataAccessException exception) {
    ErrorMessage errorMessage = new ErrorMessage("Unique Key Violation Error");
    return Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).type(MediaType.APPLICATION_JSON).build();
  }

}
