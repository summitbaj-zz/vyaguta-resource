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
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.service.ClientService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Path("/clients")
public class ClientRs {

  @Inject
  ClientService clientService;

  @Path("/")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response list(
      @Min(value = 1, message = "Page must be greater than zero.") @QueryParam("page") Integer pageNum,
      @QueryParam("offset") Integer offset) {
    Page page = PageUtil.page(pageNum, offset);
    List<Client> clients = clientService
        .find(page.getStart(), page.getOffset());
    return Response.status(Response.Status.OK)
        .entity(JsonToStringBuilder.toString(clients)).build();
  }

  @Path("/")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response create(@NotNull @Valid Client client) {
    client = clientService.save(client);
    return Response.status(Response.Status.OK)
        .entity(JsonToStringBuilder.toString(client)).build();
  }

  @Path("/{id}")
  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response update(@PathParam("id") String id,
      @NotNull @Valid Client clientNew) {
    Client client = clientService.merge(id, clientNew);
    return Response.status(Response.Status.OK)
        .entity(JsonToStringBuilder.toString(client)).build();
  }

  @Path("/{id}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response findById(@PathParam("id") String id) {
    Client client = clientService.findById(id);
    if (client != null) {
      return Response.status(Response.Status.OK)
          .entity(JsonToStringBuilder.toString(client)).build();
    } else {
      throw new ObjectNotFoundException();
    }
  }

  @Path("/{id}")
  @DELETE
  @Produces(MediaType.APPLICATION_JSON)
  public Response remove(@PathParam("id") String id) {
    clientService.removeById(id);
    return Response.status(Response.Status.OK).build();
  }
}
