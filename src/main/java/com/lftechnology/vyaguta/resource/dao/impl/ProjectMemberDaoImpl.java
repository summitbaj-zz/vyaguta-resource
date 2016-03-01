package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectMemberDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectMemberDaoImpl extends BaseDao<ProjectMember, String>implements ProjectMemberDao {

    public ProjectMemberDaoImpl() {
        super(ProjectMember.class);
    }

    @Override
    public List<ProjectMember> findByProject(Project project) {
        return em.createNamedQuery(ProjectMember.findByProject, ProjectMember.class).setParameter("project", project).getResultList();
    }

    @Override
    public List<ProjectMember> findByEmployee(User employee) {
        return em.createNamedQuery(ProjectMember.findByEmployee, ProjectMember.class).setParameter("employee", employee).getResultList();
    }

    @Override
    public List<ProjectMember> findByProjectAndEmployee(Project project, User employee) {
        return em.createNamedQuery(ProjectMember.findByProjectAndEmployee, ProjectMember.class).setParameter("project", project)
                .setParameter("employee", employee).getResultList();
    }

}
