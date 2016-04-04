package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
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
        searchByField("q", CommonConstant.TITLE);
        filterByDate(ProjectDaoImpl.START_DATE);
        filterByDate(ProjectDaoImpl.END_DATE);
        filterBy("projectType.title");
        filterBy("projectStatus.title");
        filterBy("budgetType.title");
    }

}
