package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaMaker;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
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
        return em.createNamedQuery(ProjectMember.FIND_BY_PROJECT, ProjectMember.class).setParameter("project", project)
                .getResultList();
    }

    @Override
    protected Predicate[] extractPredicates(CriteriaMaker<ProjectMember> queryBuilder) {
        return new Predicate[] {};
    }

    @Override
    public Map<String, EntitySorter<ProjectMember>> getSortOperations() {
        return null;
    }

    @Override
    public Map<String, EntityFilter<ProjectMember>> getFilters() {
        return null;
    }

}
