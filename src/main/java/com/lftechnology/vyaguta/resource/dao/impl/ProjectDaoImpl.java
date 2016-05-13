package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.Query;

import com.lftechnology.vyaguta.commons.Constant;
import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
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

    @SuppressWarnings({ "serial", "unchecked" })
    @Override
    public List<Map<String, Object>> findBookedResource(LocalDate date) {
        List<Map<String, Object>> output = new ArrayList<>();

        Query query = em
                .createQuery(
                        "SELECT pt.title , COUNT(DISTINCT p.id), SUM(CASE WHEN cm.billed = 't' AND :date BETWEEN cm.joinDate AND cm.endDate THEN (cm.allocation*0.01) ELSE 0 END) AS Billed, SUM(CASE WHEN cm.billed = 'f' AND :date BETWEEN cm.joinDate AND cm.endDate THEN (cm.allocation*0.01) ELSE 0 END) AS Unbilled FROM ContractMember cm JOIN cm.contract c JOIN c.project p JOIN p.projectType pt WHERE :date BETWEEN c.startDate AND c.endDate GROUP BY pt.id")
                .setParameter("date", date);

        List<Object[]> result = query.getResultList();

        for (Object[] obj : result) {
            Map<String, Object> map = new HashMap<String, Object>() {
                {
                    put("projectType", obj[0]);
                    put("numberOfProjects", obj[1]);
                    put("billed", obj[2]);
                    put("unbilled", obj[3]);
                }
            };
            output.add(map);
        }
        return output;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> findOverdueProjects(String projectStatus) {
        List<Map<String, Object>> output = new ArrayList<>();

        Query query = em
                .createQuery(
                        "SELECT p.id, p.title, ps.title, ps.color, MAX(c.endDate) FROM Contract c JOIN c.project p JOIN p.projectStatus ps  WHERE lower(ps.title) = :status GROUP BY p.id, ps.title,ps.color")
                .setParameter("status", projectStatus.toLowerCase());
        List<Object[]> result = query.getResultList();
        for (Object[] obj : result) {
            output.add(new HashMap<String, Object>() {
                {
                    put("projectId", obj[0]);
                    put("projectTitle", obj[1]);
                    put("projectStatus", obj[2]);
                    put("projectStatusColor", obj[3]);
                    put("endDate", obj[4] != null ? LocalDate.parse(obj[4].toString(), Constant.DATE_FORMAT_DB) : null);
                }
            });
        }
        return output;
    }

    @Override
    public List<Contract> contractsEndingBetween(LocalDate startPoint, LocalDate endPoint) {
        return em.createNamedQuery(Contract.FIND_ENDING_CONTRACTS_BETWEEN_DATES, Contract.class).setParameter("startPoint", startPoint)
                .setParameter("endPoint", endPoint).getResultList();
    }
}