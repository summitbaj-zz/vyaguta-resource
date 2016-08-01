package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectDao extends CrudDao<Project, UUID> {

    /**
     * @param LocalDate
     *            date
     * @return List of Map containing keys "projectType", "numberOfProjects",
     *         "billed", "unbilled"
     */
    List<Map<String, Object>> findBookedResource(LocalDate date);

    /**
     * Returns list of overdue projects
     * 
     * @param String
     *            projectStatus
     * @return List of Map containing keys "projectId", "projectTitle"
     *         "projectStatus","projectStatusColor", "endDate"
     */
    List<Map<String, Object>> findOverdueProjects(String projectStatus);

    /**
     * @param LocalDate
     * @param LocalDate
     * @return List {@link Contract}
     */
    List<Contract> contractsEndingBetween(LocalDate startPoint, LocalDate endPoint);

    /**
     * Returns list of {@link Project} where {@link Employee} has worked.
     * 
     * @param {@link Employee}
     * @return (@link List<{@link Project}>}
     */
    List<Project> findProjectsOfEmployee(Employee employee, MultivaluedMap<String, String> queryParameter);
}
