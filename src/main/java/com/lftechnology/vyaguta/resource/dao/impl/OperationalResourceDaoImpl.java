package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.OperationalResourceDao;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;

public class OperationalResourceDaoImpl extends BaseDao<OperationalResource, UUID> implements OperationalResourceDao{

    public OperationalResourceDaoImpl() {
        super(OperationalResource.class);
    }

    @Override
    public Map<String, EntitySorter<OperationalResource>> getSortOperations() {
        return new HashMap<String, EntitySorter<OperationalResource>>();
    }

    @Override
    public Map<String, EntityFilter<OperationalResource>> getFilters() {
        return new HashMap<String, EntityFilter<OperationalResource>>();
    }
}
