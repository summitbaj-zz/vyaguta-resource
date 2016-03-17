package com.lftechnology.vyaguta.resource.service;

import java.util.List;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;
import com.lftechnology.vyaguta.resource.entity.ProjectMemberHistory;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectMemberService extends CrudService<ProjectMember, String> {

    List<ProjectMember> findByProjectId(String projectId);

    List<ProjectMemberHistory> findAllHistory();

}
