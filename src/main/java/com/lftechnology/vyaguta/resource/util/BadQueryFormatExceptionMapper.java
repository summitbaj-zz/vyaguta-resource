package com.lftechnology.vyaguta.resource.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.resource.exception.BadQueryFormatException;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
public class BadQueryFormatExceptionMapper implements ExceptionMapper<BadQueryFormatException> {

    @Override
    public Response toResponse(BadQueryFormatException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage());
        return Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).type(MediaType.APPLICATION_JSON)
                .build();
    }

}
