package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.Map;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ContractDaoImpl extends BaseDao<Contract, String>implements ContractDao {

    public ContractDaoImpl(Class<Contract> entityClass) {
        super(Contract.class);
    }

    @Override
    public Map<String, EntitySorter<Contract>> getSortOperations() {
        return new HashMap<>();
    }

    @Override
    public Map<String, EntityFilter<Contract>> getFilters() {
        return new HashMap<>();
    }

}
