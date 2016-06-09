package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.UserRoleDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.entity.UserRole;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class UserRoleDaoImpl extends BaseDao<UserRole, UUID> implements UserRoleDao {

    public UserRoleDaoImpl() {
        super(UserRole.class);
    }

    @Override
    public Map<String, EntitySorter<UserRole>> getSortOperations() {
        return new HashMap<>();
    }

    @Override
    public Map<String, EntityFilter<UserRole>> getFilters() {
        return new HashMap<>();
    }

    @Override
    public List<Role> findRolesOfUser(User user) {
        return em.createNamedQuery(UserRole.FIND_ROLES_OF_USER, Role.class).setParameter("user", user).getResultList();
    }
}
