package com.lftechnology.vyaguta.resource.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.resource.exception.ParameterFormatException;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
public class ParameterFormatExceptionMapper implements ExceptionMapper<ParameterFormatException> {

    @Override
    public Response toResponse(ParameterFormatException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage());
        return Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).type(MediaType.APPLICATION_JSON)
                .build();
    }

}
