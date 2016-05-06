package com.lftechnology.vyaguta.resource.dao.impl;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.vyaguta.resource.dao.ProjectHistoryDao;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectHistoryDaoImpl implements ProjectHistoryDao {

    @Inject
    public EntityManager em;

    @Override
    public EntityManager getEm() {
        return em;
    }

}
