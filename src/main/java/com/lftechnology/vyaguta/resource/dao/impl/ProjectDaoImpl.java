package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectDaoImpl extends BaseDao<Project, String>implements ProjectDao {

    public static final String START_DATE = "startDate";
    public static final String END_DATE = "endDate";
    public static final String PROJECT_TYPE = "projectType";
    public static final String PROJECT_STATUS = "projectStatus";
    public static final String BUDGET_TYPE = "budgetType";

    private ProjectSort projectSort = new ProjectSort();
    private ExtractPredicateUtil<Project> extractPredicateUtil = new ExtractPredicateUtil<>();

    public ProjectDaoImpl() {
        super(Project.class);
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<Project> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, CommonConstant.TITLE));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, CommonConstant.TITLE));
        }

        if (qb.getFilters().containsKey(ProjectDaoImpl.START_DATE)) {
            predicates.add(extractPredicateUtil.addStartDatePredicate(qb,
                    qb.getFilters().getFirst(ProjectDaoImpl.START_DATE)));
        }

        if (qb.getFilters().containsKey(ProjectDaoImpl.END_DATE)) {
            predicates.add(
                    extractPredicateUtil.addEndDatePredicate(qb, qb.getFilters().getFirst(ProjectDaoImpl.END_DATE)));
        }

        // get list of projects with projectType
        if (qb.getFilters().containsKey(ProjectDaoImpl.PROJECT_TYPE)) {
            predicates.add(this.createJoin(qb, ProjectType.class, ProjectDaoImpl.PROJECT_TYPE));
        }

        // get list of projects with projectStatus
        if (qb.getFilters().containsKey(ProjectDaoImpl.PROJECT_STATUS)) {
            predicates.add(this.createJoin(qb, ProjectStatus.class, ProjectDaoImpl.PROJECT_STATUS));
        }

        // get list of projects with BudgetType
        if (qb.getFilters().containsKey(ProjectDaoImpl.BUDGET_TYPE)) {
            predicates.add(this.createJoin(qb, ProjectStatus.class, ProjectDaoImpl.BUDGET_TYPE));
        }

        return predicates.toArray(new Predicate[] {});
    }

    private Predicate createJoin(QueryBuilder<Project> qb, Class entity, String field) {
        String queryValue = qb.getFilters().getFirst(field);
        Join<Project, Class> ps = qb.getRoot().join(field);
        return qb.getCriteriaBuilder().equal(ps.get(CommonConstant.TITLE), queryValue);
    }

    @Override
    public QuerySort<Project> getQuerySort() {
        return projectSort;
    }

}