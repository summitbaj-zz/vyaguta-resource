package com.lftechnology.vyaguta.resource.rs;

import java.util.Map;
import java.util.UUID;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;
import com.lftechnology.vyaguta.resource.service.OperationalResourceService;

@Path("/operationalresources")
public class OperationalResourceRs {

    @Inject
    private OperationalResourceService operationalResourceService;

    @Path("/")
    @POST
    @RolesAllowed({ "Admin" })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@NotNull @Valid OperationalResource operationalResource) {
        return Response.status(Response.Status.OK).entity(this.operationalResourceService.save(operationalResource)).build();
    }

    @Path("/")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        Map<String, Object> projects =
                this.operationalResourceService.findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(projects).build();
    }

    @Path("/{id}")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") UUID id) {
        OperationalResource operationalResource = this.operationalResourceService.findById(id);
        if (operationalResource != null) {
            return Response.status(Response.Status.OK).entity(operationalResource).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @RolesAllowed({ "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") UUID id) {
        this.operationalResourceService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }
}
