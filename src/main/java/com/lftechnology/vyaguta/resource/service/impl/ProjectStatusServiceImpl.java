package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.service.ProjectStatusService;

public class ProjectStatusServiceImpl implements ProjectStatusService {

    @Inject
    private ProjectStatusDao projectStatusDao;

    @Override
    public ProjectStatus save(ProjectStatus projectStatus) {
        return projectStatusDao.save(projectStatus);
    }

    @Override
    public ProjectStatus update(ProjectStatus projectStatus) {
        return projectStatusDao.update(projectStatus);
    }

    @Override
    public ProjectStatus merge(String id, ProjectStatus obj) {
        ProjectStatus projectStatus = this.findById(id);
        if (projectStatus == null) {
            throw new ObjectNotFoundException();
        }
        projectStatus.setTitle(obj.getTitle());
        return this.update(projectStatus);
    }

    @Override
    public void remove(ProjectStatus projectStatus) {
        projectStatusDao.remove(projectStatus);

    }

    @Override
    public void removeById(String id) {
        ProjectStatus projectStatus = this.findById(id);
        if (projectStatus == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(projectStatus);
    }

    @Override
    public ProjectStatus findById(String id) {
        return projectStatusDao.findById(id);
    }

    @Override
    public List<ProjectStatus> findAll() {
        return projectStatusDao.findAll();
    }

    @Override
    public Long count() {
        return projectStatusDao.count();
    }

    @Override
    public List<ProjectStatus> find(Integer start, Integer offset) {
        return projectStatusDao.find(start, offset);
    }

}
