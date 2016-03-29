package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.filter.ProjectFilter;
import com.lftechnology.vyaguta.resource.sort.ProjectSort;

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
    private ProjectFilter projectFilter = new ProjectFilter();

    @Inject
    Logger log;

    public ProjectDaoImpl() {
        super(Project.class);
    }

    @Override
    public Map<String, EntityFilter<Project>> getFilters() {
        return projectFilter.getFilters();
    }

    @Override
    public Map<String, EntitySorter<Project>> getSortOperations() {
        return projectSort.getSortOperations();
    }

}