package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.filter.ProjectFilter;
import com.lftechnology.vyaguta.resource.sort.ProjectSort;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectDaoImpl extends BaseDao<Project, UUID> implements ProjectDao {

    public static final String START_DATE = "startDate";
    public static final String END_DATE = "endDate";
    public static final String PROJECT_TYPE = "projectType";
    public static final String PROJECT_STATUS = "projectStatus";
    public static final String BUDGET_TYPE = "budgetType";

    private ProjectSort projectSort = new ProjectSort();
    private ProjectFilter projectFilter = new ProjectFilter();

    @Inject
    private ClientDao clientDao;

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

    public void deleteClient(UUID id) {
        Client client = this.clientDao.findById(id);
        List<Project> projects = em.createNamedQuery(Project.FIND_BY_CLIENT, Project.class).setParameter("client", client).getResultList();
        for (Project p : projects) {
            p.setClient(null);
            this.update(p);
        }
    }

}