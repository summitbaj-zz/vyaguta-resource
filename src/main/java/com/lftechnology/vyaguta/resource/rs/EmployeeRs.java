package com.lftechnology.vyaguta.resource.rs;

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

import com.lftechnology.vyaguta.commons.util.MultivaluedMapConverter;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.ContractMemberService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Path("/employees")
public class EmployeeRs {

    @Inject
    private ContractMemberService contractMemberService;

    /**
     * @param Employee
     *            id {@link UUID}
     * @param Query
     *            parameter "startDate" and "endDate" to filter the result
     * @return {@link List<{@link Project}>}
     */
    @Path("/{empId}/projects")
    @GET
    @RolesAllowed({ "Employee", "Admin" })
    @Produces(MediaType.APPLICATION_JSON)
    public Response listProjectsOfEmployee(@PathParam("empId") UUID empId, @Context UriInfo uriInfo) {
        Employee employee = new Employee();
        employee.setId(empId);
        return Response.status(Response.Status.OK)
                .entity(contractMemberService.findByEmployee(employee, MultivaluedMapConverter.convert(uriInfo.getQueryParameters())))
                .build();
    }
}
