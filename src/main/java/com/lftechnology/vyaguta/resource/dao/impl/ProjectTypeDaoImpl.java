package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.filter.ProjectTypeFilter;
import com.lftechnology.vyaguta.resource.sort.ProjectTypeSort;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectTypeDaoImpl extends BaseDao<ProjectType, String>implements ProjectTypeDao {

    private ProjectTypeSort projectTypeSort = new ProjectTypeSort();
    private ProjectTypeFilter projectTypeFilter = new ProjectTypeFilter();

    public ProjectTypeDaoImpl() {
        super(ProjectType.class);
    }

    @Override
    public Map<String, EntitySorter<ProjectType>> getSortOperations() {
        return projectTypeSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<ProjectType>> getFilters() {
        return projectTypeFilter.getFilters();
    }

}
