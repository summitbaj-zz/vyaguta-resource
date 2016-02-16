package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.PersistenceException;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author achyut <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectTypeDaoImpl extends BaseDao implements ProjectTypeDao {
  @Inject
  CriteriaUtil<ProjectType> criteriaUtil;

  @Override
  public ProjectType save(ProjectType projectType) {
    try {
      em.persist(projectType);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return projectType;
  }

  @Override
  public ProjectType update(ProjectType projectType) {
    try {
      em.merge(projectType);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return projectType;
  }

  @Override
  public void remove(ProjectType projectTypeNew) {
    try {
      em.remove(em.merge(projectTypeNew));
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
  }

  @Override
  public ProjectType findById(String id) {
    return em.find(ProjectType.class, id);
  }

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
