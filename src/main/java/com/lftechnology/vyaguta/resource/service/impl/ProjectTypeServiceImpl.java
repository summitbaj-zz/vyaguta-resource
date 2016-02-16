package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.service.ProjectTypeService;

/**
 * 
 * @author achyut <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectTypeServiceImpl implements ProjectTypeService {
  @Inject
  ProjectTypeDao projectTypeDao;

  @Override
  public ProjectType save(ProjectType projectType) {
    return projectTypeDao.save(projectType);
  }

  @Override
  public ProjectType update(ProjectType projectType) {
    return projectTypeDao.update(projectType);
  }

  @Override
  public ProjectType merge(String id, ProjectType obj) {
    ProjectType projectType = this.findById(id);
    if (projectType == null) {
      throw new ObjectNotFoundException();
    }
    projectType.setTitle(obj.getTitle());
    this.update(projectType);
    return projectType;
  }

  @Override
  public void remove(ProjectType projectTypeNew) {
    ProjectType projectTypeOld = this.findById(projectTypeNew.getId());
    if (projectTypeOld == null) {
      throw new ObjectNotFoundException();
    }
    projectTypeDao.remove(projectTypeOld);
  }

  @Override
  public ProjectType findById(String id) {
    ProjectType projectType = projectTypeDao.findById(id);
    if (projectType == null) {
      throw new ObjectNotFoundException();
    } else {
      return this.update(projectType);
    }
  }

  @Override
  public List<ProjectType> findAll() {
    return projectTypeDao.findAll();
  }

  @Override
  public Long count() {
    return projectTypeDao.count();
  }

  @Override
  public List<ProjectType> find(Integer start, Integer offset) {
    return projectTypeDao.find(start, offset);
  }
}
