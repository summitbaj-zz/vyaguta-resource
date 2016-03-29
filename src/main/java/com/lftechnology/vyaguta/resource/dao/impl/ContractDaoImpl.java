package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.filter.ContractFilter;
import com.lftechnology.vyaguta.resource.sort.ContractSort;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ContractDaoImpl extends BaseDao<Contract, String>implements ContractDao {

    private ContractSort contractSort = new ContractSort();
    private ContractFilter contractFilter = new ContractFilter();

    public ContractDaoImpl(Class<Contract> entityClass) {
        super(Contract.class);
    }

    @Override
    public Map<String, EntitySorter<Contract>> getSortOperations() {
        return contractSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<Contract>> getFilters() {
        return contractFilter.getFilters();
    }

}
