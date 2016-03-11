package com.lftechnology.vyaguta.resource.rs;

import java.util.List;

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
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        List<BudgetType> budgetTypes = budgetTypeService.findByFilter(uriInfo.getQueryParameters());
        return Response.status(Response.Status.OK).entity(budgetTypes).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@NotNull @Valid BudgetType budgetType) {
        budgetType = budgetTypeService.save(budgetType);
        return Response.status(Response.Status.OK).entity(budgetType).build();
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, @NotNull @Valid BudgetType budgetTypeNew) {
        BudgetType budgetType = budgetTypeService.merge(id, budgetTypeNew);
        return Response.status(Response.Status.OK).entity(budgetType).build();
    }

    @Path("/{id}")
    @GET
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") String id) {
        budgetTypeService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }
}
