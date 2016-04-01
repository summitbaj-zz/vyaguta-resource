package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
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
    public BudgetType merge(UUID id, BudgetType obj) {
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
    public void removeById(UUID id) {
        BudgetType budgetType = this.findById(id);
        if (budgetType == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(budgetType);
    }

    @Override
    public BudgetType findById(UUID id) {
        return budgetTypeDao.findById(id);
    }

    @Override
    public List<BudgetType> findAll() {
        return budgetTypeDao.findAll();
    }

    @Override
    public Long count() {
        return budgetTypeDao.count(null);
    }

    @Override
    public List<BudgetType> find(Integer start, Integer offset) {
        return budgetTypeDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", budgetTypeDao.count(queryParameters));
                put("data", budgetTypeDao.findByFilter(queryParameters));
            }
        };
    }
}
