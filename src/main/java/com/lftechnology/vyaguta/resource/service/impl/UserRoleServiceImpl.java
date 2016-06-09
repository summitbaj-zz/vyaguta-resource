package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.allOf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.Role;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.SetupDao;
import com.lftechnology.vyaguta.resource.dao.UserRoleDao;
import com.lftechnology.vyaguta.resource.entity.UserRole;
import com.lftechnology.vyaguta.resource.service.UserRoleService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class UserRoleServiceImpl implements UserRoleService {

    @Inject
    private UserRoleDao userRoleDao;

    @Inject
    private SetupDao setupDao;

    @Override
    public UserRole save(UserRole UserRole) {
        return userRoleDao.save(UserRole);
    }

    @Override
    public UserRole update(UserRole UserRole) {
        return userRoleDao.update(UserRole);
    }

    @Override
    public UserRole merge(UUID id, UserRole obj) {
        UserRole UserRole = this.findById(id);
        if (UserRole == null) {
            throw new ObjectNotFoundException();
        }
        UserRole.setRole(obj.getRole());
        return this.update(UserRole);
    }

    @Override
    public void remove(UserRole entity) {
        userRoleDao.remove(entity);

    }

    @Override
    public void removeById(UUID id) {
        UserRole UserRole = this.findById(id);
        if (UserRole == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(UserRole);
    }

    @Override
    public UserRole findById(UUID id) {
        return userRoleDao.findById(id);
    }

    @Override
    public List<UserRole> findAll() {
        return userRoleDao.findAll();
    }

    @Override
    public Long count() {
        return userRoleDao.count(null);
    }

    @Override
    public List<UserRole> find(Integer start, Integer offset) {
        return userRoleDao.find(start, offset);
    }

    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", userRoleDao.count(queryParameters));
                put("data", userRoleDao.findByFilter(queryParameters));
            }
        };
    }

    @Override
    public List<Role> findRolesOfUser(User user) {
        List<com.lftechnology.vyaguta.resource.entity.Role> roles = userRoleDao.findRolesOfUser(user);
        if (roles.isEmpty()) {
            com.lftechnology.vyaguta.resource.entity.Role defaultRole = setupDao.getDefaultRole();
            this.mapUserToDefauleRole(user, defaultRole);
            roles.add(defaultRole);
        }
        return convertEntityToPojoRole(roles);
    }

    private List<Role> convertEntityToPojoRole(List<com.lftechnology.vyaguta.resource.entity.Role> roles) {
        List<Role> pojoRoles = new ArrayList<>();
        for (com.lftechnology.vyaguta.resource.entity.Role role : roles) {
            Role pojoRole = new Role();
            pojoRole.setRole(role.getTitle());
            pojoRoles.add(pojoRole);
        }
        return pojoRoles;
    }

    private void mapUserToDefauleRole(User user, com.lftechnology.vyaguta.resource.entity.Role defaultRole) {
        this.save(this.buildUserRole(user, defaultRole));
    }

    private UserRole buildUserRole(User user, com.lftechnology.vyaguta.resource.entity.Role defaultRole) {
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(defaultRole);
        userRole.setCreatedBy(user);
        return userRole;
    }
}
