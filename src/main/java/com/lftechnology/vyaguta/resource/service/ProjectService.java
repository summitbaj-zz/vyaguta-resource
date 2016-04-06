package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectService extends CrudService<Project, UUID> {

    public List<Map<String, Object>> findHistory(Project project);
}
