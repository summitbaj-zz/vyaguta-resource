package com.lftechnology.vyaguta.resource.rs;

import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.Page;
import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;
import com.lftechnology.vyaguta.commons.util.PageUtil;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.service.ProjectStatusService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/projectstatus")
public class ProjectStatusRs {

    @Inject
    private ProjectStatusService projectStatusService;

    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(
            @Min(value = 1, message = "Page must be greater than zero.") @QueryParam("page") Integer pageNum,
            @QueryParam("offset") Integer offset) {
        Page page = PageUtil.page(pageNum, offset);
        List<ProjectStatus> projectStatus = projectStatusService.find(page.getStart(), page.getOffset());
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectStatus)).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@NotNull(message = "Request body expected") @Valid ProjectStatus projectStatus) {
        projectStatus = projectStatusService.save(projectStatus);
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectStatus)).build();
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id,
            @NotNull(message = "Request body expected") @Valid ProjectStatus projectStatusNew) {
        ProjectStatus projectStatus = projectStatusService.merge(id, projectStatusNew);
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectStatus)).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") String id) {
        ProjectStatus projectStatus = projectStatusService.findById(id);
        if (projectStatus != null) {
            return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectStatus)).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") String id) {
        projectStatusService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }

}