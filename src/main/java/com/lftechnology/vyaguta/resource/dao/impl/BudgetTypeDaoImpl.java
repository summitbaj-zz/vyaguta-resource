package com.lftechnology.vyaguta.resource.dao.impl;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class BudgetTypeDaoImpl extends BaseDao<BudgetType, String>implements BudgetTypeDao {

    public BudgetTypeDaoImpl() {
        super(BudgetType.class);
    }
}
