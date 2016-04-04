package com.lftechnology.vyaguta.resource.dao.impl;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.vyaguta.resource.dao.ContractHistoryDao;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
public class ContractHistoryDaoImpl implements ContractHistoryDao {

    @Inject
    public EntityManager em;

    @Override
    public EntityManager getEm() {
        return em;
    }

}
