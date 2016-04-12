package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ContractDaoImpl extends BaseDao<Contract, UUID> implements ContractDao {

    @Inject
    private BudgetTypeDao budgetTypeDao;

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
    public void deleteBudgetType(UUID id) {
        BudgetType budgetType = this.budgetTypeDao.findById(id);
        List<Contract> contracts =
                em.createNamedQuery(Contract.FIND_BY_BUDGET_TYPE, Contract.class).setParameter("budgetType", budgetType).getResultList();
        for (Contract c : contracts) {
            c.setBudgetType(null);
            this.update(c);
        }

    }

}
