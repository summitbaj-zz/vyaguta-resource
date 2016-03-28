package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;

import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.commons.jpautil.QuerySorter;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectSort implements QuerySort<Project> {
    private Map<String, QuerySorter<Project>> sortMap = new HashMap<>();

    public ProjectSort() {
        sortByTitle();
        sortByBudgetType();
        sortByProjectStatus();
        sortByProjectType();
    }

    @Override
    public Map<String, QuerySorter<Project>> getSortMap() {
        return sortMap;
    }

    public void sortByTitle() {
        sortMap.put("title", new QuerySorter<Project>() {

            @Override
            public Order sort(QueryBuilder<Project> qb, String sortField, boolean ascending) {
                if (ascending) {
                    return qb.getCriteriaBuilder().asc(qb.getRoot().get(sortField));
                } else {
                    return qb.getCriteriaBuilder().desc(qb.getRoot().get(sortField));
                }
            }
        });

    }

    public void sortByBudgetType() {
        sortMap.put("budgetType", new QuerySorter<Project>() {

            @Override
            public Order sort(QueryBuilder<Project> qb, String sortField, boolean ascending) {
                Join<Project, BudgetType> bt = qb.getRoot().join(ProjectDaoImpl.BUDGET_TYPE, JoinType.LEFT);
                if (ascending) {
                    return qb.getCriteriaBuilder().asc(bt.get(CommonConstant.TITLE));
                } else {
                    return qb.getCriteriaBuilder().desc(bt.get(CommonConstant.TITLE));
                }
            }
        });
    }

    public void sortByProjectStatus() {
        sortMap.put("projectStatus", new QuerySorter<Project>() {

            @Override
            public Order sort(QueryBuilder<Project> qb, String sortField, boolean ascending) {
                Join<Project, ProjectStatus> ps = qb.getRoot().join(ProjectDaoImpl.PROJECT_STATUS, JoinType.LEFT);
                if (ascending) {
                    return qb.getCriteriaBuilder().asc(ps.get(CommonConstant.TITLE));
                } else {
                    return qb.getCriteriaBuilder().desc(ps.get(CommonConstant.TITLE));
                }
            }
        });
    }

    public void sortByProjectType() {
        sortMap.put("projectType", new QuerySorter<Project>() {

            @Override
            public Order sort(QueryBuilder<Project> qb, String sortField, boolean ascending) {
                Join<Project, ProjectType> pt = qb.getRoot().join(ProjectDaoImpl.PROJECT_TYPE, JoinType.LEFT);
                if (ascending) {
                    return qb.getCriteriaBuilder().asc(pt.get(CommonConstant.TITLE));
                } else {
                    return qb.getCriteriaBuilder().desc(pt.get(CommonConstant.TITLE));
                }
            }

        });
    }
}
