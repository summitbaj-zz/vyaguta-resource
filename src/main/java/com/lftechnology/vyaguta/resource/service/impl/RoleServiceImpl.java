package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.dao.RoleDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.service.RoleService;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
@Stateless
public class RoleServiceImpl implements RoleService {

    @Inject
    RoleDao roleDao;

    @Inject
    ContractDao contractDao;

    @Override
    public Role save(Role role) {
        return roleDao.save(role);
    }

    @Override
    public Role update(Role role) {
        return roleDao.update(role);
    }

    @Override
    public Role merge(UUID id, Role obj) {
        Role role = this.findById(id);
        if (role == null) {
            throw new ObjectNotFoundException();
        }
        role.setTitle(obj.getTitle());
        return this.update(role);
    }

    @Override
    public void remove(Role role) {
        roleDao.remove(role);
    }

    @Override
    public void removeById(UUID id) {
        Role role = this.findById(id);
        if (role == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(role);
    }

    @Override
    public Role findById(UUID id) {
        return roleDao.findById(id);
    }

    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }

    @Override
    public Long count() {
        return roleDao.count(null);
    }

    @Override
    public List<Role> find(Integer start, Integer offset) {
        return roleDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", roleDao.count(queryParameters));
                put("data", roleDao.findByFilter(queryParameters));
            }
        };
    }
}
