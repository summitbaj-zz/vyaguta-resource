package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectStatusDaoImpl extends BaseDao<ProjectStatus, String>implements ProjectStatusDao {

    private CommonSort<ProjectStatus> projectStatusSort = new CommonSort<>();
    private ExtractPredicateUtil<ProjectStatus> extractPredicateUtil = new ExtractPredicateUtil<>();

    public ProjectStatusDaoImpl() {
        super(ProjectStatus.class);
    }

    @Override
    public QuerySort<ProjectStatus> getQuerySort() {
        projectStatusSort.sortByField("title");
        return projectStatusSort;
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<ProjectStatus> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, ""));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, CommonConstant.TITLE));
        }

        return predicates.toArray(new Predicate[] {});
    }
}
