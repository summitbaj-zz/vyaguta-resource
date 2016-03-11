package com.lftechnology.vyaguta.resource.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectMember;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.service.ProjectService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class ProjectServiceImpl implements ProjectService {

    @Inject
    private ProjectDao projectDao;

    @Inject
    private TagDao tagDao;

    @Override
    public Project save(Project project) {
        return projectDao.save(this.fixTags(this.fixProjectMembers(project)));
    }

    @Override
    public Project update(Project project) {
        return projectDao.update(project);
    }

    @Override
    public Project merge(String id, Project obj) {
        Project project = this.findById(id);
        if (project == null) {
            throw new ObjectNotFoundException();
        }
        project.setTitle(obj.getTitle());
        project.setDescription(obj.getDescription());
        project.setProjectStatus(obj.getProjectStatus());
        project.setProjectType(obj.getProjectType());
        project.setBudgetType(obj.getBudgetType());
        project.setStartDate(obj.getStartDate());
        project.setEndDate(obj.getEndDate());
        project.setTags(this.fixTags(obj).getTags());
        return this.update(project);
    }

    @Override
    public void remove(Project entity) {
        projectDao.remove(entity);
    }

    @Override
    public void removeById(String id) {
        Project project = this.findById(id);
        if (project == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(project);
    }

    @Override
    public Project findById(String id) {
        return projectDao.findById(id);
    }

    @Override
    public List<Project> findAll() {
        return projectDao.findAll();
    }

    @Override
    public Long count() {
        return projectDao.count(null);
    }

    @Override
    public List<Project> find(Integer start, Integer offset) {
        return projectDao.find(start, offset);
    }

    private Project fixTags(Project project) {
        List<Tag> newTagList = new ArrayList<>();
        List<Tag> validTagList = new ArrayList<>();
        try {
            /*
             * Eliminate redundant Tag objects, which is evaluated comparing id
             * and title fields
             */
            Set<Tag> tagSet = new HashSet<>();
            tagSet.addAll(project.getTags());
            validTagList.addAll(tagSet);

            for (Tag tempTag : validTagList) {
                if (tempTag.getId() == null && tempTag.getTitle() != null) {
                    tempTag = tagDao.save(tempTag);
                } else {
                    if (tagDao.findById(tempTag.getId()) == null) {
                        throw new ObjectNotFoundException("No tag found for id: " + tempTag.getId());
                    }
                }
                newTagList.add(tempTag);
            }
            project.setTags(newTagList);
            return project;
        } catch (NullPointerException e) {
            return project;
        }
    }

    private Project fixProjectMembers(Project project) {
        try {
            for (ProjectMember pm : project.getProjectMembers()) {
                pm.setProject(project);
            }
        } catch (NullPointerException e) {
            return project;
        }
        return project;
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", projectDao.count(queryParameters));
                put("data", projectDao.findByFilter(queryParameters));
            }
        };
    }
}
