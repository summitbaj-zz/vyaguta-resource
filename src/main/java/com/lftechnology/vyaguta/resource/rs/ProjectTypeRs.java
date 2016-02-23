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
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.service.ProjectTypeService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/projecttypes")
public class ProjectTypeRs {

  @Inject
  private ProjectTypeService projectTypeService;

  @Path("/")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response list(@Min(value = 1, message = "Page must be greater than zero.") @QueryParam("page") Integer pageNum,
      @QueryParam("offset") Integer offset) {
    Page page = PageUtil.page(pageNum, offset);
    List<ProjectType> projectTypes = projectTypeService.find(page.getStart(), page.getOffset());
    return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectTypes)).build();
  }

  @Path("/")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response create(@NotNull @Valid ProjectType projectType) {
    projectType = projectTypeService.save(projectType);
    return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectType)).build();
  }

  @Path("/{id}")
  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response update(@PathParam("id") String id, @NotNull @Valid ProjectType projectTypeNew) {
    ProjectType projectType = projectTypeService.merge(id, projectTypeNew);
    return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectType)).build();
  }

  @Path("/{id}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response findById(@PathParam("id") String id) {
    ProjectType projectType = projectTypeService.findById(id);
    if (projectType != null) {
      return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(projectType)).build();
    } else {
      throw new ObjectNotFoundException();
    }
  }

  @Path("/{id}")
  @DELETE
  @Produces(MediaType.APPLICATION_JSON)
  public Response remove(@PathParam("id") String id) {
    projectTypeService.removeById(id);
    return Response.status(Response.Status.OK).build();
  }
}
