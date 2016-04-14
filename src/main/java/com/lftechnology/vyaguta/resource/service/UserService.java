package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
@FunctionalInterface
public interface UserService {
    public List<User> fetchUsers(List<UUID> userIds);
}
