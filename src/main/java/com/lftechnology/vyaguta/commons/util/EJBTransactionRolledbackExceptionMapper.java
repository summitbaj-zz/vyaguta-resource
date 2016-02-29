package com.lftechnology.vyaguta.commons.util;

import javax.ejb.EJBTransactionRolledbackException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
public class EJBTransactionRolledbackExceptionMapper implements ExceptionMapper<EJBTransactionRolledbackException> {

    @Override
    public Response toResponse(EJBTransactionRolledbackException exception) {
        return Response.status(Response.Status.BAD_REQUEST).entity(exception.getMessage())
                .type(MediaType.APPLICATION_JSON).build();
    }

}
