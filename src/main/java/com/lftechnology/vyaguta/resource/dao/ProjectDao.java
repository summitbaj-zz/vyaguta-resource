package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Project;

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
     * @return List of Map containing keys "project", "projectStatus", "endDate"
     */
    List<Map<String, Object>> findOverdueProjects(String projectStatus);
}
