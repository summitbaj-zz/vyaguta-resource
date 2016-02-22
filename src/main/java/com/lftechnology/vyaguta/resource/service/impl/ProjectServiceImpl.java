package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.instanceOf;

import java.util.List;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.service.ProjectService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectServiceImpl implements ProjectService {

  @Inject
  private ProjectDao projectDao;

  @Override
  public Project save(Project project) {
    return projectDao.save(project);
  }

  @Override
  public Project update(Project project) {
    return projectDao.update(project);
  }

  @Override
  public Project merge(String id, Project obj) {
    Project project = this.findById(id);
    if (project == null) {
      throw new ObjectNotFoundException();
    }
    project.setTitle(obj.getTitle());
    project.setDescription(obj.getDescription());
    project.setProjectStatusId(obj.getProjectStatusId());
    project.setProjectTypeId(obj.getProjectTypeId());
    project.setBudgetTypeId(obj.getBudgetTypeId());
    project.setStartDate(obj.getStartDate());
    project.setEndDate(obj.getEndDate());
    return this.update(project);
  }

  @Override
  public void remove(Project entity) {
    projectDao.remove(entity);
  }

  @Override
  public void removeById(String id) {
    Project project = this.findById(id);
    if (project == null) {
      throw new ObjectNotFoundException();
    }
    this.remove(project);
  }

  @Override
  public Project findById(String id) {
    return projectDao.findById(Project.class, id);
  }

  @Override
  public List<Project> findAll() {
    return projectDao.findAll();
  }

  @Override
  public Long count() {
    return projectDao.count();
  }

  @Override
  public List<Project> find(Integer start, Integer offset) {
    return projectDao.find(start, offset);
  }
}
