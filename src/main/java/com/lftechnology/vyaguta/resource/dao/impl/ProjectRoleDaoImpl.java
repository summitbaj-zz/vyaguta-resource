package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ProjectRoleDao;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class ProjectRoleDaoImpl extends BaseDao<ProjectRole, String> implements ProjectRoleDao {

    public ProjectRoleDaoImpl() {
        super(ProjectRole.class);
    }

    /**
     * This method defines predicates for Criteria query on the basis of query parameters.
     * 
     * @param MultiValued
     *            <String, String> queryParameters
     * @param CriteriaBuilder
     *            criteriaBuilder
     * @param Root
     *            <Entity> root
     * @return Predicate[]
     */
    @Override
    protected Predicate[] extractPredicates(MultivaluedMap<String, String> queryParameters, CriteriaBuilder criteriaBuilder,
            Root<ProjectRole> root) {
        List<Predicate> predicates = new ArrayList<>();

        // search by title
        if (queryParameters.containsKey(CommonConstant.TITLE)) {
            String title = queryParameters.getFirst(CommonConstant.TITLE).toUpperCase();
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(root.get(CommonConstant.TITLE)), title);
            predicates.add(predicate);
        }

        return predicates.toArray(new Predicate[] {});
    }
}
