package com.lftechnology.vyaguta.resource.dao.impl;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.vyaguta.resource.dao.ProjectHistoryRootDao;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
public class ProjectHistoryRootDaoImpl implements ProjectHistoryRootDao {

    @Inject
    public EntityManager em;

    @Override
    public EntityManager getEm() {
        return em;
    }

}
