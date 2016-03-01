package com.lftechnology.vyaguta.resource.dao.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

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
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

public class ProjectDaoImplTest {
    @Mock
    private EntityManager em;

    @Mock
    private CriteriaUtil<Project> criteriaUtil;

    @InjectMocks
    private ProjectDaoImpl projectDaoImpl;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSave() {

        // arrange
        Project project = this.buildProject();
        Mockito.doNothing().when(em).persist(project);
        Mockito.doNothing().when(em).flush();

        // act
        Project resultProject = this.projectDaoImpl.save(project);

        // assert
        Mockito.verify(em).persist(project);
        Mockito.verify(em).flush();
        assertThat(resultProject, is(project));
    }

    @Test
    public void testSaveExpectDataAccessException() {
        // arrange
        Project project = new Project();
        Mockito.doThrow(PersistenceException.class).when(em).persist(project);

        exception.expect(DataAccessException.class);
        // act
        this.projectDaoImpl.save(project);
    }

    @Test
    public void testUpdate() {

        // arrange
        Project project = this.buildProject();
        Mockito.when(em.merge(project)).thenReturn(project);
        Mockito.doNothing().when(em).flush();

        // act
        Project resultProject = this.projectDaoImpl.update(project);

        // assert
        Mockito.verify(em).merge(project);
        Mockito.verify(em).flush();
        assertThat(resultProject, is(project));
    }

    @Test
    public void testUpdateExpectDataAccessException() {

        // arrange
        Mockito.doThrow(PersistenceException.class).when(em).merge(Matchers.anyObject());

        exception.expect(DataAccessException.class);

        // act
        this.projectDaoImpl.update(Matchers.anyObject());
    }

    @Test
    public void testRemove() {

        // arrange
        Project project = this.buildProject();
        Mockito.doNothing().when(em).remove(project);
        Mockito.when(em.merge(project)).thenReturn(project);

        // act
        this.projectDaoImpl.remove(project);

        // assert
        Mockito.verify(em).merge(project);
        Mockito.verify(em).remove(project);
    }

    @Test
    public void testRemoveExpectDataAccessException() {

        // arrange
        Project project = new Project();
        Mockito.doThrow(PersistenceException.class).when(em).merge(project);

        exception.expect(DataAccessException.class);

        // act
        this.projectDaoImpl.remove(project);
    }

    @Test
    public void testFindById() {

        // arrange
        Project project = this.buildProject();
        Mockito.when(em.find(Matchers.anyObject(), Matchers.anyString())).thenReturn(project);

        // act
        Project resultProject = this.projectDaoImpl.findById("asdf");

        // assert
        assertThat(resultProject, is(project));
    }

    @Test
    public void testFindAll() {

        // arrange
        Mockito.when(criteriaUtil.findAll(Project.class)).thenReturn(new ArrayList<Project>());

        // act
        this.projectDaoImpl.findAll();

        // assert
        Mockito.verify(criteriaUtil).findAll(Project.class);
    }

    @Test
    public void testCount() {

        // arrange
        Mockito.when(criteriaUtil.count(Project.class)).thenReturn(10L);

        // act
        Long count = this.projectDaoImpl.count();

        // assert
        Mockito.verify(criteriaUtil).count(Project.class);
        assertThat(count, is(Long.valueOf(10)));
    }

    @Test
    public void testfind() {

        // arrange
        Mockito.when(criteriaUtil.find(Matchers.anyObject(), Matchers.anyInt(), Matchers.anyInt()))
                .thenReturn(new ArrayList<Project>());

        // act
        this.projectDaoImpl.find(1, 20);

        // assert
        Mockito.verify(criteriaUtil).find(Project.class, 1, 20);
    }

    private Project buildProject() {
        Project project = new Project();
        project.setId("1234");
        project.setTitle("Vyaguta");
        project.setCreatedAt(LocalDateTime.now());
        project.setCreatedBy(new User("abc"));
        project.setBudgetType(new BudgetType());
        project.setProjectType(new ProjectType());
        project.setProjectStatus(new ProjectStatus());
        return project;
    }
}
