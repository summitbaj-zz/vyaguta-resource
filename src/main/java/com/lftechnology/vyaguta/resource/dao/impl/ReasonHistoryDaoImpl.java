package com.lftechnology.vyaguta.resource.dao.impl;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.vyaguta.resource.dao.ReasonHistoryDao;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
public class ReasonHistoryDaoImpl implements ReasonHistoryDao {

    @Inject
    public EntityManager em;

    @Override
    public EntityManager getEm() {
        return em;
    }

}
