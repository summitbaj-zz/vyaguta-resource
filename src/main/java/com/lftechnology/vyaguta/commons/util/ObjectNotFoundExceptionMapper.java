package com.lftechnology.vyaguta.commons.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;

public class ObjectNotFoundExceptionMapper implements ExceptionMapper<ObjectNotFoundException> {

  @Override
  public Response toResponse(ObjectNotFoundException exception) {
    return Response.status(Response.Status.NOT_FOUND).entity(exception.getMessage()).type(MediaType.APPLICATION_JSON).build();
  }

}
