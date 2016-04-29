package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.filter.ProjectStatusFilter;
import com.lftechnology.vyaguta.resource.sort.ProjectStatusSort;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectStatusDaoImpl extends BaseDao<ProjectStatus, UUID> implements ProjectStatusDao {

    private ProjectStatusSort projectStatusSort = new ProjectStatusSort();
    private ProjectStatusFilter projectStatusFilter = new ProjectStatusFilter();

    public ProjectStatusDaoImpl() {
        super(ProjectStatus.class);
    }

    @Override
    public Map<String, EntitySorter<ProjectStatus>> getSortOperations() {
        return projectStatusSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<ProjectStatus>> getFilters() {
        return projectStatusFilter.getFilters();
    }

}
