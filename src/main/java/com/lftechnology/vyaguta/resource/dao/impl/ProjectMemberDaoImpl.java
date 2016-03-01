package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
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

    @Inject
    private CriteriaUtil<ProjectMember> criteriaUtil;

    @Override
    public ProjectMember findById(String id) {
        return em.find(ProjectMember.class, id);
    }

    @Override
    public List<ProjectMember> findAll() {
        return criteriaUtil.findAll(ProjectMember.class);
    }

    @Override
    public Long count() {
        return criteriaUtil.count(ProjectMember.class);
    }

    @Override
    public List<ProjectMember> find(Integer start, Integer offset) {
        return criteriaUtil.find(ProjectMember.class, start, offset);
    }

    @Override
    public List<ProjectMember> findByProject(Project project) {
        return em.createNamedQuery(ProjectMember.findByProject, ProjectMember.class).setParameter("project", project)
                .getResultList();
    }

    @Override
    public List<ProjectMember> findByEmployee(User employee) {
        return em.createNamedQuery(ProjectMember.findByEmployee, ProjectMember.class).setParameter("employee", employee)
                .getResultList();
    }

    @Override
    public List<ProjectMember> findByProjectAndEmployee(Project project, User employee) {
        return em.createNamedQuery(ProjectMember.findByProjectAndEmployee, ProjectMember.class)
                .setParameter("project", project).setParameter("employee", employee).getResultList();
    }

}
