package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ProjectRoleDao;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;
import com.lftechnology.vyaguta.resource.service.ProjectRoleService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class ProjectRoleServiceImpl implements ProjectRoleService {

    @Inject
    ProjectRoleDao projectRoleDao;

    @Override
    public ProjectRole save(ProjectRole projectRole) {
        return projectRoleDao.save(projectRole);
    }

    @Override
    public ProjectRole update(ProjectRole projectRole) {
        return projectRoleDao.update(projectRole);
    }

    @Override
    public ProjectRole merge(String id, ProjectRole obj) {
        ProjectRole projectRole = this.findById(id);
        if (projectRole == null) {
            throw new ObjectNotFoundException();
        }
        projectRole.setTitle(obj.getTitle());
        projectRole.setDescription(obj.getDescription());
        return this.update(projectRole);
    }

    @Override
    public void remove(ProjectRole projectRole) {
        projectRoleDao.remove(projectRole);
    }

    @Override
    public void removeById(String id) {
        ProjectRole projectRole = this.findById(id);
        if (projectRole == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(projectRole);
    }

    @Override
    public ProjectRole findById(String id) {
        return projectRoleDao.findById(id);
    }

    @Override
    public List<ProjectRole> findAll() {
        return projectRoleDao.findAll();
    }

    @Override
    public Long count() {
        return projectRoleDao.count(null);
    }

    @Override
    public List<ProjectRole> find(Integer start, Integer offset) {
        return projectRoleDao.find(start, offset);
    }

    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        Map<String, Object> map = new HashMap<>();
        map.put("count", projectRoleDao.count(queryParameters));
        map.put("data", projectRoleDao.findByFilter(queryParameters));
        return map;
    }
}
