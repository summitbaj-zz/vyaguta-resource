package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.PersistenceException;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class BudgetTypeDaoImpl extends BaseDao implements BudgetTypeDao {

  @Inject
  CriteriaUtil<BudgetType> criteriaUtil;

  @Override
  public BudgetType save(BudgetType budgetType) {
    try {
      em.persist(budgetType);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException)
          .toString(), persistenceException.getCause());
    }
    return budgetType;
  }

  @Override
  public BudgetType update(BudgetType budgetType) {
    try {
      em.merge(budgetType);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException)
          .toString(), persistenceException.getCause());
    }
    return budgetType;
  }

  @Override
  public void remove(BudgetType budgetType) {
    try {
      em.remove(em.merge(budgetType));
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException)
          .toString(), persistenceException.getCause());
    }
  }

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
