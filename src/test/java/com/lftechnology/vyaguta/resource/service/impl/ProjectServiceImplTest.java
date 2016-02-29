package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.entity.Tag;

public class ProjectServiceImplTest {

    @Mock
    private ProjectDao projectDao;

    @Mock
    private TagDao tagDao;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @InjectMocks
    private ProjectServiceImpl projectServiceImpl;

    Project project;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        project = this.buildProject();
    }

    @Test
    public void testSaveWhenIdisNullAndTitleIsGiven() {

        // arrange
        Tag tag = this.buildTag("asdf", "java");
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag(null, "Maven"));
        project.setTag(tags);

        Mockito.when(tagDao.save(Mockito.anyObject())).thenReturn(tag);

        // act
        projectServiceImpl.save(project);

        // assert
        Mockito.verify(tagDao).save(Mockito.anyObject());
        Mockito.verify(tagDao, Mockito.never()).findById(Mockito.anyString());
        Mockito.verify(projectDao).save(project);
    }

    @Test
    public void testSaveWhenIdisGivenAndTitleIsNull() {

        // arrange
        Tag tag = this.buildTag("asdf", "java");
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag("ad", null));
        project.setTag(tags);

        Mockito.when(tagDao.findById(Mockito.anyString())).thenReturn(tag);

        // act
        projectServiceImpl.save(project);

        // assert
        Mockito.verify(tagDao, Mockito.never()).save(Mockito.anyObject());
        Mockito.verify(tagDao).findById(Mockito.anyString());
        Mockito.verify(projectDao).save(project);
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testSaveWhenIdisGivenAndIsNotValidExpectObjectNotFoundException() {

        // arrange
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag("ad", null));
        project.setTag(tags);
        Mockito.when(tagDao.findById("1234")).thenThrow(ObjectNotFoundException.class);

        exception.expect(ObjectNotFoundException.class);

        // act
        projectServiceImpl.save(project);
    }

    private Project buildProject() {
        Project project = new Project();
        project.setId("1234");
        project.setTitle("Vyaguta");
        project.setCreatedAt(LocalDateTime.now());
        project.setCreatedBy(new User("abc"));
        project.setBudgetType(buildBudgetType());
        project.setProjectType(buildProjectType());
        project.setProjectStatus(buildProjectStatus());
        return project;
    }

    private Tag buildTag(String id, String title) {
        Tag tag = new Tag();
        tag.setId(id);
        tag.setTitle(title);
        return tag;
    }

    private BudgetType buildBudgetType() {
        BudgetType budgetType = new BudgetType();
        budgetType.setId("1234");
        budgetType.setTitle("budget type");
        return budgetType;
    }

    private ProjectType buildProjectType() {
        ProjectType projectType = new ProjectType();
        projectType.setId("1234");
        projectType.setTitle("project type");
        return projectType;
    }

    private ProjectStatus buildProjectStatus() {
        ProjectStatus projectStatus = new ProjectStatus();
        projectStatus.setId("1234");
        projectStatus.setTitle("project status");
        return projectStatus;
    }

}
