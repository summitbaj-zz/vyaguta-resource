package com.lftechnology.vyaguta.resource.service;

import java.util.List;

import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@FunctionalInterface
public interface DashBoardService {

    public List<Project> list(MultivaluedMap<String, String> queryParameter);
}
