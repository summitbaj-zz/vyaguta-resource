package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
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
        return em.createNamedQuery(ProjectMember.findByProject, ProjectMember.class).setParameter("project", project)
                .getResultList();
    }

    @Override
    public QuerySort<ProjectMember> getQuerySort() {
        return null;
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<ProjectMember> queryBuilder) {
        return null;
    }

}
