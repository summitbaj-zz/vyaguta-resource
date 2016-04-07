package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.Map;

import com.lftechnology.vyaguta.resource.entity.Project;

public interface ProjectHistoryService {
    public List<Map<String, Object>> findHistory(Project project);

    public void logHistory(Project project);
}
