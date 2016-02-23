package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class BudgetTypeDaoImpl extends BaseDao<BudgetType, String>implements BudgetTypeDao {

    @Inject
    CriteriaUtil<BudgetType> criteriaUtil;

    @Override
    public BudgetType findById(String id) {
        return em.find(BudgetType.class, id);
    }

    @Override
    public List<BudgetType> findAll() {
        return criteriaUtil.findAll(BudgetType.class);
    }

    @Override
    public Long count() {
        return criteriaUtil.count(BudgetType.class);
    }

    @Override
    public List<BudgetType> find(Integer start, Integer offset) {
        return criteriaUtil.find(BudgetType.class, start, offset);
    }
}
