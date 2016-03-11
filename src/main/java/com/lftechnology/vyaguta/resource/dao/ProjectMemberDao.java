package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectMemberDao extends CrudDao<ProjectMember, String> {

    List<ProjectMember> findByProject(Project project);

}
