package com.lftechnology.vyaguta.resource.httpfilter;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

import com.lftechnology.vyaguta.commons.SecurityRequestContext;
import com.lftechnology.vyaguta.commons.exception.AuthenticationException;
import com.lftechnology.vyaguta.commons.pojo.CommonRole;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.service.UserRoleService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    private UserRoleService userRoleService;

    private String validateUrl = Configuration.instance().getAuthUrl() + "userinfo/";

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        SecurityRequestContext.setCurrentUser(null);
        SecurityRequestContext.setAccessToken(null);

        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            final String token = authorizationHeader.substring("Bearer".length()).trim();
            final User user = validateToken(token);

            SecurityRequestContext.setCurrentUser(user);
            SecurityRequestContext.setAccessToken(token);

            requestContext.setSecurityContext(new SecurityContext() {

                @Override
                public boolean isUserInRole(String role) {
                    return user.getRoles().contains(new CommonRole(role));
                }

                @Override
                public boolean isSecure() {
                    return false;
                }

                @Override
                public Principal getUserPrincipal() {
                    return new Principal() {

                        @Override
                        public String getName() {
                            return token;
                        }
                    };
                }

                @Override
                public String getAuthenticationScheme() {
                    return null;
                }
            });
        }
    }

    private User validateToken(String token) {
        Client client = ClientBuilder.newClient();
        Response response = client.target(validateUrl).request().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).get(Response.class);
        if (response.getStatus() == 200) {
            User user = response.readEntity(User.class);
            List<CommonRole> roles = userRoleService.findRolesOfUser(user);
            user.setRoles(roles);
            return user;
        } else if (response.getStatus() == 401) {
            throw new AuthenticationException();
        } else {
            throw new WebApplicationException(response);
        }
    }

}
