package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
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

    private UUID id = UUID.randomUUID();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        project = this.buildProject();
    }

    @Test
    public void testSaveWhenTagIdisNullAndTagTitleIsGiven() {

        // arrange
        Tag tag = this.buildTag(id, "java");
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag(null, "Maven"));
        project.setTags(tags);

        Mockito.when(tagDao.save(Mockito.anyObject())).thenReturn(tag);

        // act
        projectServiceImpl.save(project);

        // assert
        Mockito.verify(tagDao).save(Mockito.anyObject());
        Mockito.verify(tagDao, Mockito.never()).findById(UUID.randomUUID());
        Mockito.verify(projectDao).save(project);
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testSaveWhenTagTitleIsNotUnique() {

        // arrange
        List<Tag> tags = new ArrayList<>();
        Tag tag = buildTag(null, "Java");
        tags.add(tag);
        project.setTags(tags);
        Mockito.when(tagDao.save(tag)).thenThrow(DataAccessException.class);

        exception.expect(DataAccessException.class);

        // when
        projectServiceImpl.save(project);
    }

    @Test
    public void testUpdate() {

        // arrange
        Project project = this.buildProject();
        Mockito.when(projectDao.update(project)).thenReturn(project);

        // act
        Project resultProject = this.projectServiceImpl.update(project);

        // assert
        Mockito.verify(projectDao).update(project);
        assertThat(resultProject, is(project));
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testMergeWhenProjectIdIsNotValidExpectObjectNotFoundExceptio() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenThrow(ObjectNotFoundException.class);

        exception.expect(ObjectNotFoundException.class);

        // act
        this.projectServiceImpl.merge(id, project);
    }

    @Test
    public void testMergeWhenProjectIdIsValid() {

        // arrange
        Project projectOld = this.buildProject();
        projectOld.setTitle("Old title");
        Mockito.when(projectDao.findById(id)).thenReturn(projectOld);
        Mockito.when(projectDao.update(projectOld)).thenReturn(projectOld);

        // act
        Project resultProject = this.projectServiceImpl.merge(id, project);

        // assert
        assertThat(resultProject.getTitle(), is(projectOld.getTitle()));
        Mockito.verify(projectDao).update(projectOld);
        Mockito.verify(projectDao).findById(id);
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testRemoveByIdWhenProjectIdIsNotValidExpectNoObjectFoundException() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenThrow(ObjectNotFoundException.class);

        exception.expect(ObjectNotFoundException.class);

        // act
        this.projectServiceImpl.removeById(id);
    }

    @Test
    public void testRemoveByIdWhenIdIsValid() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenReturn(project);
        Mockito.doNothing().when(projectDao).remove(project);

        // act
        this.projectServiceImpl.removeById(id);

        // assert
        Mockito.verify(projectDao).findById(id);
        Mockito.verify(projectDao).remove(project);
    }

    @Test
    public void testfindById() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenReturn(project);

        // act
        this.projectServiceImpl.findById(id);

        // assert
        Mockito.verify(projectDao).findById(id);
    }

    @Test
    public void testFindAll() {

        // arrange
        Mockito.when(projectDao.findAll()).thenReturn(new ArrayList<Project>());

        // act
        this.projectDao.findAll();

        // assert
        Mockito.verify(projectDao).findAll();
    }

    @Test
    public void testCount() {

        // arrange
        Mockito.when(projectDao.count(null)).thenReturn(10L);

        // act
        Long result = this.projectDao.count(null);

        // assert
        Mockito.verify(projectDao).count(null);
        assertThat(result, is(Long.valueOf(10)));
    }

    @Test
    public void testFind() {

        // arrange
        Mockito.when(projectDao.find(Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<Project>());

        // act
        this.projectServiceImpl.find(2, 20);

        // assert
        Mockito.verify(projectDao).find(Matchers.anyInt(), Matchers.anyInt());

    }

    @Test
    public void testFindByFilter() {

        // arrange
        Map<String, List<String>> multiValue = new HashMap<>();
        multiValue.put("title", Arrays.asList("AML"));
        MultivaluedMap<String, String> queryParameters = new MultivaluedMapImpl<>(multiValue);
        List<Project> tags = new ArrayList<>();
        tags.add(this.buildProject());

        Mockito.when(projectDao.findByFilter(queryParameters)).thenReturn(tags);
        Mockito.when(projectDao.count(queryParameters)).thenReturn(10L);

        // act
        Map<String, Object> result = this.projectServiceImpl.findByFilter(queryParameters);

        // assert
        assertTrue(result.containsKey("count"));
        assertTrue(result.containsValue(10L));
        assertTrue(result.containsKey("data"));
        assertTrue(result.containsValue(tags));
        Mockito.verify(projectDao).count(queryParameters);
        Mockito.verify(projectDao).findByFilter(queryParameters);
    }

    private Tag buildTag(UUID id, String title) {
        Tag tag = new Tag();
        tag.setId(id);
        tag.setTitle(title);
        return tag;
    }

    private Project buildProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setTitle("Vyaguta");
        project.setCreatedAt(LocalDateTime.now());
        project.setCreatedBy(new User(UUID.randomUUID()));
        project.setProjectType(buildProjectType());
        project.setProjectStatus(buildProjectStatus());
        return project;
    }

    private ProjectType buildProjectType() {
        ProjectType projectType = new ProjectType();
        projectType.setId(UUID.randomUUID());
        projectType.setTitle("project type");
        return projectType;
    }

    private ProjectStatus buildProjectStatus() {
        ProjectStatus projectStatus = new ProjectStatus();
        projectStatus.setId(UUID.randomUUID());
        projectStatus.setTitle("project status");
        return projectStatus;
    }

}
