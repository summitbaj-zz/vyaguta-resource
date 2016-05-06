package com.lftechnology.vyaguta.resource.filter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaMaker;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.impl.ProjectDaoImpl;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectFilter extends CommonFilter<Project>implements Filterable<Project> {

    public ProjectFilter() {
        filterBy("title");

        filterByDate(ProjectDaoImpl.START_DATE, ProjectDaoImpl.START_DATE);
        filterByDate(ProjectDaoImpl.END_DATE, ProjectDaoImpl.END_DATE);

        filterBy("projectType", "projectType|title");
        filterBy("projectStatus", "projectStatus|title");

        searchByField("q", CommonConstant.TITLE);

        filterMap.put("contract.endDate", new EntityFilter<Project>() {

            @Override
            public Predicate filter(CriteriaMaker<Project> cm, String field, List<String> values) {
                List<Predicate> predicates = new ArrayList<>();
                for (String value : values) {
                    Join join = cm.getRoot().join("contracts");
                    Path path = join.get("endDate");
                    Predicate predicate = ProjectFilter.this.buildDatePredicate(cm.getCriteriaBuilder(), path, value);
                    predicates.add(predicate);
                }
                return cm.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
            }
        });

        filterMap.put("contract.startDate", new EntityFilter<Project>() {

            @Override
            public Predicate filter(CriteriaMaker<Project> cm, String field, List<String> values) {
                List<Predicate> predicates = new ArrayList<>();
                for (String value : values) {
                    Join join = cm.getRoot().join("contracts");
                    Path path = join.get("startDate");
                    Predicate predicate = ProjectFilter.this.buildDatePredicate(cm.getCriteriaBuilder(), path, value);
                    predicates.add(predicate);
                }
                return cm.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
            }
        });

        filterMap.put("contract.actualEndDate", new EntityFilter<Project>() {

            @Override
            public Predicate filter(CriteriaMaker<Project> cm, String field, List<String> values) {
                List<Predicate> predicates = new ArrayList<>();
                for (String value : values) {
                    Join join = cm.getRoot().join("contracts");
                    Path path = join.get("actualEndDate");
                    Predicate predicate = ProjectFilter.this.buildDatePredicate(cm.getCriteriaBuilder(), path, value);
                    predicates.add(predicate);
                }
                return cm.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
            }
        });

        filterMap.put("contract.budgetType", new EntityFilter<Project>() {

            @Override
            public Predicate filter(CriteriaMaker<Project> cm, String field, List<String> values) {
                List<Predicate> predicates = new ArrayList<>();
                for (String value : values) {
                    Join join = cm.getRoot().join("contracts").join("budgetType");
                    Path path = join.get("title");
                    Predicate predicate = cm.getCriteriaBuilder().equal(path, value);
                    predicates.add(predicate);
                }
                return cm.getCriteriaBuilder().or(predicates.toArray(new Predicate[0]));
            }
        });
    }

}
