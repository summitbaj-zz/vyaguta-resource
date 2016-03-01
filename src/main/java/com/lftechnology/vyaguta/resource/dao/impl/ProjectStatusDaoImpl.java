package com.lftechnology.vyaguta.resource.dao.impl;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectStatusDaoImpl extends BaseDao<ProjectStatus, String>implements ProjectStatusDao {

    public ProjectStatusDaoImpl() {
        super(ProjectStatus.class);
    }
}
