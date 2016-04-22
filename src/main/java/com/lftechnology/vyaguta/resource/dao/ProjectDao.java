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

    List<Map<String, Object>> findBookedResource(LocalDate date);

    List<Map<String, Object>> findFlaggedProjects(String projectStatus);
}
