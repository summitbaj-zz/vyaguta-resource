package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectTypeDaoImpl extends BaseDao<ProjectType, String>implements ProjectTypeDao {

    private CommonSort<ProjectType> projectTypeSort = new CommonSort<>();
    private ExtractPredicateUtil<ProjectType> extractPredicateUtil = new ExtractPredicateUtil<>();

    public ProjectTypeDaoImpl() {
        super(ProjectType.class);
    }

    @Override
    public QuerySort<ProjectType> getQuerySort() {
        projectTypeSort.sortByField("title");
        return projectTypeSort;
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<ProjectType> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, CommonConstant.TITLE));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, CommonConstant.TITLE));
        }

        return predicates.toArray(new Predicate[] {});
    }
}
