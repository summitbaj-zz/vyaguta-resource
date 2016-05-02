package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.filter.BudgetTypeFilter;
import com.lftechnology.vyaguta.resource.sort.BudgetTypeSort;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class BudgetTypeDaoImpl extends BaseDao<BudgetType, UUID> implements BudgetTypeDao {

    private BudgetTypeSort budgetTypeSort = new BudgetTypeSort();
    private BudgetTypeFilter budgetTypeFilter = new BudgetTypeFilter();

    public BudgetTypeDaoImpl() {
        super(BudgetType.class);
    }

    @Override
    public Map<String, EntitySorter<BudgetType>> getSortOperations() {
        return budgetTypeSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<BudgetType>> getFilters() {
        return budgetTypeFilter.getFilters();
    }

}
