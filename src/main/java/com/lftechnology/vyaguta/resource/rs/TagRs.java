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
import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.service.TagService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/tags")
@Api(value = "/tags", produces = "application/json", consumes = "application/json")
public class TagRs {

    @Inject
    private TagService tagService;

    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get list of Tags", notes = "Can provide page number and offset value")
    public Response list(@Context UriInfo uriInfo) {
        List<Tag> tags = tagService.findByFilter(uriInfo.getQueryParameters());
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(tags)).build();
    }

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Create a new tag")
    public Response create(
            @ApiParam(value = "Tag object to create", required = true) @NotNull(message = "Request body expected") @Valid Tag tag) {
        tag = tagService.save(tag);
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(tag)).build();
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Update exisitng tag")
    public Response update(@ApiParam(value = "id that needs to be updated", required = true) @PathParam("id") String id,
            @ApiParam(value = "Tag object to update", required = true) @NotNull(message = "Request body expected") @Valid Tag tagNew) {
        Tag tag = tagService.merge(id, tagNew);
        return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(tag)).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get a tag")
    public Response findById(@ApiParam(value = "Specific tag id", required = true) @PathParam("id") String id) {
        Tag tag = tagService.findById(id);
        if (tag != null) {
            return Response.status(Response.Status.OK).entity(JsonToStringBuilder.toString(tag)).build();
        } else {
            throw new ObjectNotFoundException();
        }
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Delete a tag")
    public Response remove(
            @ApiParam(value = "Tag id that needs to be deleted", required = true) @PathParam("id") String id) {
        tagService.removeById(id);
        return Response.status(Response.Status.OK).build();
    }

}
