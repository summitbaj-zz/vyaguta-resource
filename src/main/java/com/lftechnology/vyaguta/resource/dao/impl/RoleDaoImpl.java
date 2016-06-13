package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.RoleDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.filter.RoleFilter;
import com.lftechnology.vyaguta.resource.sort.RoleSort;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
public class RoleDaoImpl extends BaseDao<Role, UUID> implements RoleDao {

    private RoleSort roleSort = new RoleSort();
    private RoleFilter roleFilter = new RoleFilter();

    public RoleDaoImpl() {
        super(Role.class);
    }

    @Override
    public Map<String, EntitySorter<Role>> getSortOperations() {
        return roleSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<Role>> getFilters() {
        return roleFilter.getFilters();
    }

}
