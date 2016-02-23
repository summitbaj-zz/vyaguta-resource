package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectTypeDaoImpl extends BaseDao<ProjectType, String>implements ProjectTypeDao {
    @Inject
    private CriteriaUtil<ProjectType> criteriaUtil;

    @Override
    public List<ProjectType> findAll() {
        return criteriaUtil.findAll(ProjectType.class);
    }

    @Override
    public Long count() {
        return criteriaUtil.count(ProjectType.class);
    }

    @Override
    public List<ProjectType> find(Integer start, Integer offset) {
        return criteriaUtil.find(ProjectType.class, start, offset);
    }

}
