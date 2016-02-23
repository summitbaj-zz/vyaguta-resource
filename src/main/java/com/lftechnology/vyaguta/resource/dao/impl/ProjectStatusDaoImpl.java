package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectStatusDaoImpl extends BaseDao<ProjectStatus, String>implements ProjectStatusDao {

  @Inject
  private CriteriaUtil<ProjectStatus> criteriaUtil;

  @Override
  public List<ProjectStatus> findAll() {
    return criteriaUtil.findAll(ProjectStatus.class);
  }

  @Override
  public Long count() {
    return criteriaUtil.count(ProjectStatus.class);
  }

  @Override
  public List<ProjectStatus> find(Integer start, Integer offset) {
    return criteriaUtil.find(ProjectStatus.class, start, offset);
  }

}
