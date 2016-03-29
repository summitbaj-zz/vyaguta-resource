package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.impl.ProjectDaoImpl;
import com.lftechnology.vyaguta.resource.entity.Project;

public class ProjectFilter extends CommonFilter<Project>implements Filterable<Project> {
    public ProjectFilter() {
        findByField(CommonConstant.TITLE);
        searchByField("q", CommonConstant.TITLE);
        filterByDateField(ProjectDaoImpl.START_DATE);
        filterByDateField(ProjectDaoImpl.END_DATE);
        filterByField(ProjectDaoImpl.PROJECT_TYPE, CommonConstant.TITLE);
        filterByField(ProjectDaoImpl.PROJECT_STATUS, CommonConstant.TITLE);
        filterByField(ProjectDaoImpl.BUDGET_TYPE, CommonConstant.TITLE);
    }

}
