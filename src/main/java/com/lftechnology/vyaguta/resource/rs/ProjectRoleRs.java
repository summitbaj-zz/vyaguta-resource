package com.lftechnology.vyaguta.resource.rs;

import java.util.Map;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;
import com.lftechnology.vyaguta.resource.service.ProjectRoleService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Path("/projectroles")
public class ProjectRoleRs {

    @Inject
    ProjectRoleService projectRoleService;

    @Inject
    private Logger log;

    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        log.debug("project role list parameters: {}", uriInfo.getQueryParameters());
        Map<String, Object> projectRoles = projectRoleService
                .findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(projectRoles).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@NotNull @Valid ProjectRole projectRole) {
        projectRole = projectRoleService.save(projectRole);
        return Response.status(Response.Status.OK).entity(projectRole).build();
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, @NotNull @Valid ProjectRole projectRoleNew) {
        log.debug("project role Id: {}", id);
        ProjectRole projectRole = projectRoleService.merge(id, projectRoleNew);
        return Response.status(Response.Status.OK).entity(projectRole).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") String id) {
        log.debug("project role Id: {}", id);
        ProjectRole projectRole = projectRoleService.findById(id);
        if (projectRole != null) {
            return Response.status(Response.Status.OK).entity(projectRole).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") String id) {
        log.debug("project role Id: {}", id);
        projectRoleService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }
}
