package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.service.ProjectStatusService;

@Stateless
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
    public ProjectStatus merge(UUID id, ProjectStatus obj) {
        ProjectStatus projectStatus = this.findById(id);
        if (projectStatus == null) {
            throw new ObjectNotFoundException();
        }
        projectStatus.setTitle(obj.getTitle());
        projectStatus.setColor(obj.getColor());
        return this.update(projectStatus);
    }

    @Override
    public void remove(ProjectStatus projectStatus) {
        projectStatusDao.remove(projectStatus);

    }

    @Override
    public void removeById(UUID id) {
        ProjectStatus projectStatus = this.findById(id);
        if (projectStatus == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(projectStatus);
    }

    @Override
    public ProjectStatus findById(UUID id) {
        return projectStatusDao.findById(id);
    }

    @Override
    public List<ProjectStatus> findAll() {
        return projectStatusDao.findAll();
    }

    @Override
    public Long count() {
        return projectStatusDao.count(null);
    }

    @Override
    public List<ProjectStatus> find(Integer start, Integer offset) {
        return projectStatusDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", projectStatusDao.count(queryParameters));
                put("data", projectStatusDao.findByFilter(queryParameters));
            }
        };
    }

}
