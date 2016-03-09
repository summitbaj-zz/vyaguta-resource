package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectMemberDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;
import com.lftechnology.vyaguta.resource.service.ProjectMemberService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectMemberServiceImpl implements ProjectMemberService {

    @Inject
    private ProjectMemberDao projectMemberDao;

    @Override
    public ProjectMember save(ProjectMember projectMember) {
        return projectMemberDao.save(projectMember);
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
        return projectMemberDao.count();
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

    @Override
    public List<ProjectMember> findByEmployeeId(String employeeId) {
        User employee = new User();
        employee.setId(employeeId);
        return projectMemberDao.findByEmployee(employee);
    }

    @Override
    public List<ProjectMember> findByProjectIdAndEmployeeId(String projectId, String employeeId) {
        Project project = new Project();
        project.setId(projectId);
        User employee = new User();
        employee.setId(employeeId);
        return projectMemberDao.findByProjectAndEmployee(project, employee);
    }

    @Override
    public List<ProjectMember> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return projectMemberDao.findByFilter(queryParameters);
    }

}
