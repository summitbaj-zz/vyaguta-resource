package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import com.lftechnology.vyaguta.resource.entity.ProjectMemberHistory;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public interface ProjectMemberHistoryDao {

    public ProjectMemberHistory save(ProjectMemberHistory entity);

    public List<ProjectMemberHistory> findAll();

}
