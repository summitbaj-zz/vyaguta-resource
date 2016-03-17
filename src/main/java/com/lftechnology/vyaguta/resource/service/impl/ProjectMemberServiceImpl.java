package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ProjectMemberDao;
import com.lftechnology.vyaguta.resource.dao.ProjectMemberHistoryDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;
import com.lftechnology.vyaguta.resource.entity.ProjectMemberHistory;
import com.lftechnology.vyaguta.resource.service.ProjectMemberService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectMemberServiceImpl implements ProjectMemberService {

    @Inject
    private ProjectMemberDao projectMemberDao;

    @Inject
    private ProjectMemberHistoryDao projectMemberHistoryDao;

    @Override
    public ProjectMember save(ProjectMember projectMember) {
        ProjectMember savedProjectMember = projectMemberDao.save(projectMember);
        ProjectMemberHistory projectMemberHistory = new ProjectMemberHistory(savedProjectMember);
        projectMemberHistoryDao.save(projectMemberHistory);
        return savedProjectMember;
    }

    @Override
    public ProjectMember update(ProjectMember projectMember) {
        return projectMemberDao.update(projectMember);
    }

    @Override
    public ProjectMember merge(String id, ProjectMember obj) {
        ProjectMember projectMember = this.findById(id);
        if (projectMember == null) {
            throw new ObjectNotFoundException();
        }
        projectMember.setActive(obj.isActive());
        projectMember.setBilled(obj.isBilled());
        projectMember.setAllocation(obj.getAllocation());
        this.update(projectMember);
        return projectMember;
    }

    @Override
    public void remove(ProjectMember projectMember) {
        projectMemberDao.remove(projectMember);
    }

    @Override
    public void removeById(String id) {
        ProjectMember projectMember = this.findById(id);
        if (projectMember == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(projectMember);
    }

    @Override
    public ProjectMember findById(String id) {
        return projectMemberDao.findById(id);
    }

    @Override
    public List<ProjectMember> findAll() {
        return projectMemberDao.findAll();
    }

    @Override
    public Long count() {
        return projectMemberDao.count(null);
    }

    @Override
    public List<ProjectMember> find(Integer start, Integer offset) {
        return projectMemberDao.find(start, offset);
    }

    @Override
    public List<ProjectMember> findByProjectId(String projectId) {
        Project project = new Project();
        project.setId(projectId);
        return projectMemberDao.findByProject(project);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", projectMemberDao.count(queryParameters));
                put("data", projectMemberDao.findByFilter(queryParameters));
            }
        };

    }

    @Override
    public List<ProjectMemberHistory> findAllHistory() {
        return projectMemberHistoryDao.findAll();
    }

}
