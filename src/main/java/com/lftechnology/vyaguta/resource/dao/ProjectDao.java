package com.lftechnology.vyaguta.resource.dao;

import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectDao extends CrudDao<Project, UUID> {

    void deleteClient(UUID id);
}
