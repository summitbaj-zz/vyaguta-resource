package com.lftechnology.vyaguta.resource.util;

import javax.ejb.EJBException;
import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Provider
public class EJBExceptionMapper implements ExceptionMapper<EJBException> {

    @Inject
    Logger log;

    @Override
    public Response toResponse(EJBException exception) {

        log.info("EJBException: ", exception);
        if (exception.getCausedByException() instanceof DataAccessException) {
            return Response.status(Response.Status.BAD_REQUEST).entity(exception.getMessage()).type(MediaType.APPLICATION_JSON).build();
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Child row does not exist.");
            return Response.status(Response.Status.NOT_FOUND).entity(errorMessage).type(MediaType.APPLICATION_JSON).build();
        }

    }

}
