package com.lftechnology.vyaguta.resource.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.AvailableResource;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectService extends CrudService<Project, UUID> {

    List<Map<String, Object>> findBookedResource(LocalDate date);

    Map<String, Object> findResourceUtilization(LocalDate date);

    List<AvailableResource> findAvailableResource(LocalDate date);

    List<Map<String, Object>> findFlaggedProjects(String projectStatus);

}
