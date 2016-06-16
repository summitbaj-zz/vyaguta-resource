package com.lftechnology.vyaguta.resource.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.CommonRole;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.SetupDao;
import com.lftechnology.vyaguta.resource.dao.UserRoleDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.entity.UserRole;
import com.lftechnology.vyaguta.resource.service.UserRoleService;
import com.lftechnology.vyaguta.resource.service.UserService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class UserRoleServiceImpl implements UserRoleService {

    @Inject
    private UserService userService;

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
        UserRole userRole = this.findById(id);
        if (userRole == null) {
            throw new ObjectNotFoundException();
        }
        userRole.setRole(obj.getRole());
        userRole.setUser(obj.getUser());

        return this.update(userRole);
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
        UserRole userRole = userRoleDao.findById(id);
        List<UUID> userIds = new ArrayList<>();
        userIds.add(userRole.getUser().getId());
        List<User> users = userService.fetchUsers(userIds);
        userRole.setUser(users.get(0));
        return userRole;
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

        List<UserRole> userRoles = userRoleDao.findByFilter(queryParameters);

        List<UUID> userIds = new ArrayList<>();
        for (UserRole userRole : userRoles) {
            userIds.add(userRole.getUser().getId());
        }

        List<User> users = userService.fetchUsers(userIds);

        for (UserRole userRole : userRoles) {
            for (User user : users) {
                if (user.getId().equals(userRole.getUser().getId())) {
                    userRole.setUser(user);
                }
            }
        }

        return new HashMap<String, Object>() {
            {
                put("count", userRoleDao.count(queryParameters));
                put("data", userRoles);
            }
        };
    }

    @Override
    public List<CommonRole> findRolesOfUser(User user) {
        List<Role> roles = userRoleDao.findRolesOfUser(user);
        if (roles.isEmpty()) {
            Role defaultRole = setupDao.getDefaultRole();
            this.mapUserToDefauleRole(user, defaultRole);
            roles.add(defaultRole);
        }
        return convertEntityToPojoRole(roles);
    }

    private List<CommonRole> convertEntityToPojoRole(List<Role> roles) {
        List<CommonRole> pojoRoles = new ArrayList<>();
        for (Role role : roles) {
            CommonRole pojoRole = new CommonRole();
            pojoRole.setRole(role.getTitle());
            pojoRoles.add(pojoRole);
        }
        return pojoRoles;
    }

    private void mapUserToDefauleRole(User user, com.lftechnology.vyaguta.resource.entity.Role defaultRole) {
        this.save(this.buildUserRole(user, defaultRole));
    }

    private UserRole buildUserRole(User user, Role defaultRole) {
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(defaultRole);
        userRole.setCreatedBy(user);
        return userRole;
    }

}
