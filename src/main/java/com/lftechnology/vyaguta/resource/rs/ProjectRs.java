package com.lftechnology.vyaguta.resource.rs;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.Constant;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.service.ProjectHistoryService;
import com.lftechnology.vyaguta.resource.service.ProjectService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/projects")
public class ProjectRs {

    @Inject
    private ProjectService projectService;

    @Inject
    private ProjectHistoryService projectHistoryService;

    @Inject
    private Logger log;

    @Path("/")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@Context UriInfo uriInfo) {
        Map<String, Object> projects = projectService.findByFilter(MultivaluedMapConverter.convert(uriInfo.getQueryParameters()));
        return Response.status(Response.Status.OK).entity(projects).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ "Admin" })
    public Response create(@NotNull(message = "Request body expected") @Valid Project project) {
        return Response.status(Response.Status.OK).entity(projectService.save(project)).build();
    }

    @Path("/{id}")
    @PUT
    @RolesAllowed({ "Admin" })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") UUID id, @NotNull @Valid Project projectNew) {
        Project project = projectService.merge(id, projectNew);
        return Response.status(Response.Status.OK).entity(project).build();
    }

    @Path("/{id}")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") UUID id) {
        Project project = projectService.findById(id);
        if (project != null) {
            return Response.status(Response.Status.OK).entity(project).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @RolesAllowed({ "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathParam("id") UUID id) {
        projectService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }

    @Path("{projectId}/history")
    @GET
    @RolesAllowed({ "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public List<Map<String, Object>> history(@PathParam("projectId") UUID projectId) {
        Project project = projectService.findById(projectId);
        if (project != null) {
            return projectHistoryService.findHistory(project);
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/resource/utilization")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response resourceUtilization(@QueryParam("date") String dateStr) {
        LocalDate date = LocalDate.now();
        if (dateStr != null) {
            try {
                date = LocalDate.parse(dateStr, Constant.DATE_FORMAT_DB);
            } catch (DateTimeParseException e) {
                log.error("{}", e);
                throw new ParameterFormatException("Invalid date format");
            }
        }
        return Response.status(Response.Status.OK).entity(projectService.findResourceUtilization(date)).build();
    }

    @Path("/resource/booked")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response bookedResource(@QueryParam("date") String dateStr) {
        LocalDate date = LocalDate.now();
        if (dateStr != null) {
            try {
                date = LocalDate.parse(dateStr, Constant.DATE_FORMAT_DB);
            } catch (DateTimeParseException e) {
                log.error("{}", e);
                throw new ParameterFormatException("Invalid date format");
            }
        }
        return Response.status(Response.Status.OK).entity(projectService.findBookedResource(date)).build();
    }

    @Path("/resource/available")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response availableResource(@QueryParam("date") String dateStr) {
        LocalDate date = LocalDate.now();
        if (dateStr != null) {
            try {
                date = LocalDate.parse(dateStr, Constant.DATE_FORMAT_DB);
            } catch (DateTimeParseException e) {
                log.error("{}", e);
                throw new ParameterFormatException("Invalid date format");
            }
        }
        return Response.status(Response.Status.OK).entity(projectService.findAvailableResource(date)).build();
    }

}
