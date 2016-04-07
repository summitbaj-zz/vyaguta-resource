package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.pojo.User;

public interface UserService {
    public List<User> fetchUsers(List<UUID> userIds);
}
