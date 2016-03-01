package com.lftechnology.vyaguta.resource.dao.impl;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectTypeDaoImpl extends BaseDao<ProjectType, String>implements ProjectTypeDao {

    public ProjectTypeDaoImpl() {
        super(ProjectType.class);
    }
}
