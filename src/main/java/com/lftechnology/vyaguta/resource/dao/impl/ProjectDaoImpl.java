package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectDaoImpl extends BaseDao<Project, String>implements ProjectDao {

    @Inject
    private CriteriaUtil<Project> criteriaUtil;

    @Override
    public List<Project> findAll() {
        return criteriaUtil.findAll(Project.class);
    }

    @Override
    public Long count() {
        return criteriaUtil.count(Project.class);
    }

    @Override
    public List<Project> find(Integer start, Integer offset) {
        return criteriaUtil.find(Project.class, start, offset);
    }

    @Override
    public Project findById(String id) {
        return em.find(Project.class, id);
    }

}
