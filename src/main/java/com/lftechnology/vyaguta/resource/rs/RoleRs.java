package com.lftechnology.vyaguta.resource.rs;

import java.util.Map;
import java.util.UUID;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.service.RoleService;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
@Path("/roles")
public class RoleRs {

    @Inject
    RoleService roleService;

    @Path("/")
    @GET
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        Map<String, Object> roles = roleService.findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(roles).build();
    }

    @Path("/{id}")
    @GET
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") UUID id) {
        Role role = roleService.findById(id);
        if (role != null) {
            return Response.status(Response.Status.OK).entity(role).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }
}
