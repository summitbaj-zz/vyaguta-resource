package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.pojo.Role;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.UserRole;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface UserRoleService extends CrudService<UserRole, UUID> {

    public List<Role> findRolesOfUser(User user);
}
