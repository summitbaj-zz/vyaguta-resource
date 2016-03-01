package com.lftechnology.vyaguta.resource.service;

import java.util.List;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ProjectMemberService extends CrudService<ProjectMember, String> {

    List<ProjectMember> findByProjectId(String projectId);

    List<ProjectMember> findByEmployeeId(String employeeId);

    List<ProjectMember> findByProjectIdAndEmployeeId(String projectId, String employeeId);
}
