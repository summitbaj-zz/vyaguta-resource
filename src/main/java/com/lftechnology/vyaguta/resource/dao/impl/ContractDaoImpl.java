package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
public class ContractDaoImpl extends BaseDao<Contract, UUID> implements ContractDao {

    public ContractDaoImpl() {
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

    @Override
    public List<Contract> findEndingContracts(LocalDate date) {
        return em.createQuery("SELECT c from Contract c  WHERE c.endDate = :date", Contract.class).setParameter("date", date)
                .getResultList();
    }

}
