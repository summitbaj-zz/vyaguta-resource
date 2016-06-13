package com.lftechnology.vyaguta.resource.dao;

import java.util.List;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.entity.UserRole;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface UserRoleDao extends CrudDao<UserRole, UUID> {

    public List<Role> findRolesOfUser(User user);
}
