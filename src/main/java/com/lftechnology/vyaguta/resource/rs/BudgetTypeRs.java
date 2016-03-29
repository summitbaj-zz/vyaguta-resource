package com.lftechnology.vyaguta.resource.rs;

import java.util.Map;

import javax.annotation.security.RolesAllowed;
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

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.service.BudgetTypeService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Path("/budgettypes")
public class BudgetTypeRs {

    @Inject
    BudgetTypeService budgetTypeService;

    @Path("/")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        Map<String, Object> budgetTypes = budgetTypeService
                .findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(budgetTypes).build();
    }

    @Path("/")
    @POST
    @RolesAllowed({ "Admin" })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@NotNull @Valid BudgetType budgetType) {
        return Response.status(Response.Status.OK).entity(budgetTypeService.save(budgetType)).build();
    }

    @Path("/{id}")
    @PUT
    @RolesAllowed({ "Admin" })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, @NotNull @Valid BudgetType budgetTypeNew) {
        BudgetType budgetType = budgetTypeService.merge(id, budgetTypeNew);
        return Response.status(Response.Status.OK).entity(budgetType).build();
    }

    @Path("/{id}")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") String id) {
        BudgetType budgetType = budgetTypeService.findById(id);
        if (budgetType != null) {
            return Response.status(Response.Status.OK).entity(budgetType).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @RolesAllowed({ "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") String id) {
        budgetTypeService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }
}
