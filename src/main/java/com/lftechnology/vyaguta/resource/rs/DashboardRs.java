package com.lftechnology.vyaguta.resource.rs;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.service.DashBoardService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/dashboard")
public class DashboardRs {

    @Inject
    private DashBoardService dashboardService;

    @Path("/projectending")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        return Response.status(Response.Status.OK)
                .entity(dashboardService.list(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()))).build();
    }
}
