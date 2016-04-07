package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;
import java.util.UUID;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.GenericType;

import com.lftechnology.vyaguta.commons.SecurityRequestContext;
import com.lftechnology.vyaguta.commons.http.HttpHelper;
import com.lftechnology.vyaguta.commons.pojo.ResponseData;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.ArrayUtil;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.service.UserService;

public class UserServiceImpl implements UserService {
    private static final String USER_URL = Configuration.instance().getAuthUrl() + "users";

    @Override
    public List<User> fetchUsers(List<UUID> userIds) {
        try {
            String token = SecurityRequestContext.getAccessToken();
            String url = USER_URL + "?id=" + ArrayUtil.toCommaSeparated(userIds);

            ResponseData<User> data = HttpHelper.get(url, token, new GenericType<ResponseData<User>>() {
            });

            return data.getData();
        } catch (WebApplicationException e) {
            throw e;
        }
    }
}
