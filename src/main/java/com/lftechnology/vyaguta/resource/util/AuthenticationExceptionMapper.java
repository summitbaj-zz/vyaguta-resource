package com.lftechnology.vyaguta.resource.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.resource.exception.AuthenticationException;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
public class AuthenticationExceptionMapper implements ExceptionMapper<AuthenticationException> {

    @Override
    public Response toResponse(AuthenticationException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage());
        return Response.status(Response.Status.UNAUTHORIZED).entity(errorMessage).type(MediaType.APPLICATION_JSON)
                .build();
    }

}
