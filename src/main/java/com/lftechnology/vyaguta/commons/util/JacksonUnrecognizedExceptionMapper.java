package com.lftechnology.vyaguta.commons.util;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
// @Provider
public class JacksonUnrecognizedExceptionMapper implements ExceptionMapper<UnrecognizedPropertyException> {

    @Override
    public Response toResponse(UnrecognizedPropertyException exception) {
        ErrorMessage errorMessage = new ErrorMessage(
                StringUtils.substringBefore(exception.getMessage().replace("\"", "\'"), "("));
        return Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).type(MediaType.APPLICATION_JSON)
                .build();
    }

}