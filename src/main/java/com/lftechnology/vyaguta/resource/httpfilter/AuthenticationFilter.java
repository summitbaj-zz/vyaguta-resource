package com.lftechnology.vyaguta.resource.httpfilter;

import java.io.IOException;
import java.security.Principal;

import javax.annotation.Priority;
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

import com.lftechnology.vyaguta.commons.exception.AuthenticationException;
import com.lftechnology.vyaguta.commons.pojo.Role;
import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            final String token = authorizationHeader.substring("Bearer".length()).trim();
            final User user = validateToken(token);

            requestContext.setSecurityContext(new SecurityContext() {

                @Override
                public boolean isUserInRole(String role) {
                    return user.getRoles().contains(new Role(role));
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
        } else {
            throw new AuthenticationException();
        }
    }

    private User validateToken(String token) {
        Client client = ClientBuilder.newClient();
        Response response = client.target("http://localhost:8080/vyaguta-auth/userinfo/").request()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token).get(Response.class);
        if (response.getStatus() == 200) {
            return response.readEntity(User.class);
        } else if (response.getStatus() == 401) {
            throw new AuthenticationException();
        } else {
            throw new WebApplicationException(response);
        }
    }

}
