package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ProjectRoleDao;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;
import com.lftechnology.vyaguta.resource.filter.ProjectRoleFilter;
import com.lftechnology.vyaguta.resource.sort.ProjectRoleSort;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class ProjectRoleDaoImpl extends BaseDao<ProjectRole, UUID> implements ProjectRoleDao {

    private ProjectRoleFilter projectRoleFilter = new ProjectRoleFilter();
    private ProjectRoleSort projectRoleSort = new ProjectRoleSort();

    public ProjectRoleDaoImpl() {
        super(ProjectRole.class);
    }

    @Override
    public Map<String, EntitySorter<ProjectRole>> getSortOperations() {
        return projectRoleSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<ProjectRole>> getFilters() {
        return projectRoleFilter.getFilters();
    }

}
