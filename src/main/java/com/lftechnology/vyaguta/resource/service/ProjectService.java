package com.lftechnology.vyaguta.resource.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.AvailableResource;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectService extends CrudService<Project, UUID> {

    /**
     * @param LocalDate
     *            date
     * @return List of Map containing keys "projectType", "numberOfProjects",
     *         "billed", "unbilled"
     */
    List<Map<String, Object>> findBookedResource(LocalDate date);

    /**
     * @param date
     * @return List of Map containing keys "totalResource",
     *         "bookedResource","freeResources"
     */
    Map<String, Object> findResourceUtilization(LocalDate date);

    /**
     * @param LocalDate
     * @return List {@link AvailableResource}
     */
    List<AvailableResource> findAvailableResource(LocalDate date);

    /**
     * Returns list of overdue projects
     * 
     * @param String
     *            projectStatus
     * @return List of Map containing keys "projectId","projectTitle",
     *         "projectStatus","projectStatusColor", "endDate"
     */
    List<Map<String, Object>> findOverdueProjects(String projectStatus);

    /**
     * @param LocalDate
     * @return List {@link Contract}
     */
    List<Contract> findContractsEndingBefore(LocalDate date);

    /**
     * @param String
     *            endDate
     * 
     * @return List {@link Project}
     */
    List<Project> findContractsEndingBetween(String endDates);

}
