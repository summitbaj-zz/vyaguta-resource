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

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.exception.ParameterFormatException;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectDaoImpl extends BaseDao<Project, String>implements ProjectDao {

    private static final String START_DATE = "startDate";
    private static final String END_DATE = "endDate";
    private static final String PROJECT_TYPE = "projectType";
    private static final String PROJECT_STATUS = "projectStatus";
    private static final String BUDGET_TYPE = "budgetType";

    public ProjectDaoImpl() {
        super(Project.class);
    }

    @Override
    protected Predicate[] extractPredicates(MultivaluedMap<String, String> queryParameters,
            CriteriaBuilder criteriaBuilder, Root<Project> root) {
        List<Predicate> predicates = new ArrayList<>();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // search by title
        if (queryParameters.containsKey(CommonConstant.TITLE)) {
            String title = queryParameters.getFirst(CommonConstant.TITLE).toUpperCase();
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(root.get(CommonConstant.TITLE)), title);
            if (queryParameters.containsKey(CommonConstant.SEARCH_MODE)) {
                if (queryParameters.getFirst(CommonConstant.SEARCH_MODE).equals(CommonConstant.ANY)) {
                    predicate = criteriaBuilder.like(criteriaBuilder.upper(root.get(CommonConstant.TITLE)),
                            "%" + title + "%");
                }
            }
            predicates.add(predicate);
        }

        // get list of projects starting from and on startDate
        if (queryParameters.containsKey(ProjectDaoImpl.START_DATE)) {
            try {
                LocalDate startDate = LocalDate.parse(queryParameters.getFirst(ProjectDaoImpl.START_DATE), format);
                Predicate predicate = criteriaBuilder.greaterThanOrEqualTo(root.get(ProjectDaoImpl.START_DATE),
                        startDate);
                predicates.add(predicate);
            } catch (DateTimeParseException e) {
                throw new ParameterFormatException("Start date format is invalid, should be in yyyy-MM-dd format");
            }
        }

        // get list of projects ending before and on endDate
        if (queryParameters.containsKey(ProjectDaoImpl.END_DATE)) {
            try {
                LocalDate endDate = LocalDate.parse(queryParameters.getFirst(ProjectDaoImpl.END_DATE), format);
                Predicate predicate = criteriaBuilder.lessThanOrEqualTo(root.get(ProjectDaoImpl.END_DATE), endDate);
                predicates.add(predicate);
            } catch (DateTimeParseException e) {
                throw new ParameterFormatException("End date format is invalid, should be in yyyy-MM-dd format");
            }
        }

        // get list of projects with projectType
        if (queryParameters.containsKey(ProjectDaoImpl.PROJECT_TYPE)) {
            String projectType = queryParameters.getFirst(ProjectDaoImpl.PROJECT_TYPE).toUpperCase();

            Join<Project, ProjectType> pt = root.join(ProjectDaoImpl.PROJECT_TYPE);
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(pt.get(CommonConstant.TITLE)),
                    projectType);
            predicates.add(predicate);
        }

        // get list of projects with projectStatus
        if (queryParameters.containsKey(ProjectDaoImpl.PROJECT_STATUS)) {
            String projectStatus = queryParameters.getFirst(ProjectDaoImpl.PROJECT_STATUS).toUpperCase();

            Join<Project, ProjectStatus> ps = root.join(ProjectDaoImpl.PROJECT_STATUS);
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(ps.get(CommonConstant.TITLE)),
                    projectStatus);
            predicates.add(predicate);
        }

        // get list of projects with BudgetType
        if (queryParameters.containsKey(ProjectDaoImpl.BUDGET_TYPE)) {
            String budgetType = queryParameters.getFirst(ProjectDaoImpl.BUDGET_TYPE).toUpperCase();

            Join<Project, BudgetType> bt = root.join(ProjectDaoImpl.BUDGET_TYPE);
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(bt.get(CommonConstant.TITLE)),
                    budgetType);
            predicates.add(predicate);
        }

        return predicates.toArray(new Predicate[] {});
    }

}