package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.service.BudgetTypeService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class BudgetTypeServiceImpl implements BudgetTypeService {

    @Inject
    BudgetTypeDao budgetTypeDao;

    @Override
    public BudgetType save(BudgetType budgetType) {
        return budgetTypeDao.save(budgetType);
    }

    @Override
    public BudgetType update(BudgetType budgetType) {
        return budgetTypeDao.update(budgetType);
    }

    @Override
    public BudgetType merge(String id, BudgetType obj) {
        BudgetType budgetType = this.findById(id);
        if (budgetType == null) {
            throw new ObjectNotFoundException();
        }
        budgetType.setTitle(obj.getTitle());
        return this.update(budgetType);
    }

    @Override
    public void remove(BudgetType budgetType) {
        budgetTypeDao.remove(budgetType);
    }

    @Override
    public void removeById(String id) {
        BudgetType budgetType = this.findById(id);
        if (budgetType == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(budgetType);
    }

    @Override
    public BudgetType findById(String id) {
        return budgetTypeDao.findById(id);
    }

    @Override
    public List<BudgetType> findAll() {
        return budgetTypeDao.findAll();
    }

    @Override
    public Long count() {
        return budgetTypeDao.count();
    }

    @Override
    public List<BudgetType> find(Integer start, Integer offset) {
        return budgetTypeDao.find(start, offset);
    }

    @Override
    public List<BudgetType> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return budgetTypeDao.findByFilter(queryParameters);
    }
}
