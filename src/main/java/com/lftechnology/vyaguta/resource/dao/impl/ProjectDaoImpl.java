package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectDaoImpl extends BaseDao<Project, String>implements ProjectDao {

    private static final String TITLE = "title";
    private static final String ANY = "any";
    private static final String SEARCH_MODE = "searchMode";

    public ProjectDaoImpl() {
        super(Project.class);
    }

    @Override
    protected Predicate[] extractPredicates(MultivaluedMap<String, String> queryParameters,
            CriteriaBuilder criteriaBuilder, Root<Project> root) {
        List<Predicate> predicates = new ArrayList<>();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // search by title
        if (queryParameters.containsKey(ProjectDaoImpl.TITLE)) {
            String title = queryParameters.getFirst(ProjectDaoImpl.TITLE).toUpperCase();
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(root.get(ProjectDaoImpl.TITLE)), title);
            if (queryParameters.containsKey(ProjectDaoImpl.SEARCH_MODE)) {
                if (queryParameters.getFirst(ProjectDaoImpl.SEARCH_MODE).equals(ProjectDaoImpl.ANY)) {
                    predicate = criteriaBuilder.like(criteriaBuilder.upper(root.get(ProjectDaoImpl.TITLE)),
                            "%" + title + "%");
                }
            }
            predicates.add(predicate);
        }

        // get list of projects starting from and on startDate
        if (queryParameters.containsKey("startDate")) {
            try {
                LocalDate startDate = LocalDate.parse(queryParameters.getFirst("startDate"), format);
                Predicate predicate = criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), startDate);
                predicates.add(predicate);
            } catch (DateTimeParseException e) {
                System.out.println("=====> Keep log here. Unable to parse startDate");
            }
        }

        // get list of projects ending before and on endDate
        if (queryParameters.containsKey("endDate")) {
            try {
                LocalDate startDate = LocalDate.parse(queryParameters.getFirst("endDate"), format);
                Predicate predicate = criteriaBuilder.lessThanOrEqualTo(root.get("endDate"), startDate);
                predicates.add(predicate);
            } catch (DateTimeParseException e) {
                System.out.println("=====> Keep log here. Unable to parse endDate");
            }
        }

        // get list of projects with projectType
        if (queryParameters.containsKey("projectType")) {
            String projectType = queryParameters.getFirst("projectType").toUpperCase();

            Join<Project, ProjectType> pt = root.join("projectType");
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(pt.get("title")), projectType);
            predicates.add(predicate);
        }

        // get list of projects with projectStatus
        if (queryParameters.containsKey("projectStatus")) {
            String projectStatus = queryParameters.getFirst("projectStatus").toUpperCase();

            Join<Project, ProjectStatus> pt = root.join("projectStatus");
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(pt.get("title")), projectStatus);
            predicates.add(predicate);
        }

        // get list of projects with BudgetType
        if (queryParameters.containsKey("budgetType")) {
            String budgetType = queryParameters.getFirst("budgetType").toUpperCase();

            Join<Project, BudgetType> pt = root.join("budgetType");
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(pt.get("title")), budgetType);
            predicates.add(predicate);
        }

        return predicates.toArray(new Predicate[] {});
    }

}