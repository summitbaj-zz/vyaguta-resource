package com.lftechnology.vyaguta.resource.rs;

import java.util.List;
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

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;
import com.lftechnology.vyaguta.resource.entity.ProjectMemberHistory;
import com.lftechnology.vyaguta.resource.service.ProjectMemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/projectmembers")
@Api(value = "/projectmembers", produces = "application/json", consumes = "application/json")
public class ProjectMemberRs {

    @Inject
    private ProjectMemberService projectMemberService;

    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "List all project members", notes = "Can provide page number and offset value", response = ProjectMember.class,
            responseContainer = "List")
    public Response list(@Context UriInfo uriInfo) {
        Map<String, Object> projectMembers =
                projectMemberService.findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(projectMembers).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Add a new project member")
    @ApiResponses(value = { @ApiResponse(code = 400, message = "Invalid request body") })
    public
            Response
            create(@ApiParam(value = "Project member object to create", required = true) @NotNull(message = "Request body expected") @Valid ProjectMember projectMember) {
        projectMember = projectMemberService.save(projectMember);
        return Response.status(Response.Status.OK).entity(projectMember).build();
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Update project  member information")
    @ApiResponses(value = { @ApiResponse(code = 400, message = "Invalid request body") })
    public Response update(@ApiParam(value = "id that needs to be updated", required = true) @PathParam("id") String id, @ApiParam(
            value = "Project member object to create", required = true) @NotNull @Valid ProjectMember projectMemberNew) {
        ProjectMember project = projectMemberService.merge(id, projectMemberNew);
        return Response.status(Response.Status.OK).entity(project).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get a project member", notes = "Fetch by unique project-member id not employee id",
            response = ProjectMember.class, responseContainer = "Single JSON object")
    public Response findById(@ApiParam(value = "Id to fetch information", required = true) @PathParam("id") String id) {
        ProjectMember projectMember = projectMemberService.findById(id);
        if (projectMember != null) {
            return Response.status(Response.Status.OK).entity(projectMember).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/project/{projectId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get list of all members of a project", notes = "Fetch all members of a particular project",
            response = ProjectMember.class, responseContainer = "List")
    public Response findByProject(@ApiParam(value = "Project id", required = true) @PathParam("projectId") String project_id) {
        List<ProjectMember> projectMembers = projectMemberService.findByProjectId(project_id);
        return Response.status(Response.Status.OK).entity(projectMembers).build();
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Delete a project member")
    public Response remove(@ApiParam(value = "Project member id that needs to be deleted", required = true) @PathParam("id") String id) {
        projectMemberService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }

    @Path("/history")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listHistory() {
        List<ProjectMemberHistory> projectMemberHistory = projectMemberService.findAllHistory();
        return Response.status(Response.Status.OK).entity(projectMemberHistory).build();
    }

}
