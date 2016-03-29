package com.lftechnology.vyaguta.resource.sort;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaMaker;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.impl.ProjectDaoImpl;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectSort extends CommonSort<Project> {

    public ProjectSort() {
        sortByField("title");
        sortByBudgetType();
        sortByProjectStatus();
        sortByProjectType();
    }

    public void sortByBudgetType() {
        sortMap.put("budgetType", new EntitySorter<Project>() {

            @Override
            public Order sort(CriteriaMaker<Project> qb, String sortField, boolean ascending) {
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
        sortMap.put("projectStatus", new EntitySorter<Project>() {

            @Override
            public Order sort(CriteriaMaker<Project> qb, String sortField, boolean ascending) {
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
        sortMap.put("projectType", new EntitySorter<Project>() {

            @Override
            public Order sort(CriteriaMaker<Project> qb, String sortField, boolean ascending) {
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
