package com.lftechnology.vyaguta.resource.dao.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.entity.ProjectType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectTypeDaoImplTest {

    @Mock
    private EntityManager em;

    @Mock
    private CriteriaUtil<ProjectType> criteriaUtil;

    @InjectMocks
    private ProjectTypeDaoImpl projectTypeDaoImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSave() {

        // arrange
        ProjectType projectType = this.buildProjectType();
        Mockito.doNothing().when(em).persist(projectType);
        Mockito.doNothing().when(em).flush();

        // act
        ProjectType resultProjectType = this.projectTypeDaoImpl.save(projectType);

        // assert
        Mockito.verify(em).persist(projectType);
        Mockito.verify(em).flush();
        assertThat(resultProjectType, is(projectType));
    }

    @Test(expected = DataAccessException.class)
    public void testSaveExpectDataAccessException() {
        // arrange
        ProjectType projectType = new ProjectType();
        Mockito.doThrow(PersistenceException.class).when(em).persist(projectType);

        // act
        this.projectTypeDaoImpl.save(projectType);
    }

    @Test
    public void testUpdate() {

        // arrange
        ProjectType projectType = this.buildProjectType();
        Mockito.when(em.merge(projectType)).thenReturn(projectType);
        Mockito.doNothing().when(em).flush();

        // act
        ProjectType resultProjectType = this.projectTypeDaoImpl.update(projectType);

        // assert
        Mockito.verify(em).merge(projectType);
        Mockito.verify(em).flush();
        assertThat(resultProjectType, is(projectType));
    }

    @Test(expected = DataAccessException.class)
    public void testUpdateExpectDataAccessException() {

        // arrange
        Mockito.doThrow(PersistenceException.class).when(em).merge(Matchers.anyObject());

        // act
        this.projectTypeDaoImpl.update(Matchers.anyObject());
    }

    @Test
    public void testRemove() {

        // arrange
        ProjectType projectType = this.buildProjectType();
        Mockito.doNothing().when(em).remove(projectType);
        Mockito.when(em.merge(projectType)).thenReturn(projectType);

        // act
        this.projectTypeDaoImpl.remove(projectType);

        // assert
        Mockito.verify(em).merge(projectType);
        Mockito.verify(em).remove(projectType);
    }

    @Test(expected = DataAccessException.class)
    public void testRemoveExpectDataAccessException() {

        // arrange
        ProjectType projectType = new ProjectType();
        Mockito.doThrow(PersistenceException.class).when(em).merge(projectType);

        // act
        this.projectTypeDaoImpl.remove(projectType);
    }

    // @Test
    public void testFindById() {

        // arrange
        ProjectType projectType = this.buildProjectType();
        Mockito.when(em.find(Matchers.anyObject(), Matchers.anyString())).thenReturn(projectType);

        // act
        ProjectType resultProjectType = this.projectTypeDaoImpl.findById("asdf");

        // assert
        assertThat(resultProjectType, is(projectType));
    }

    @Test
    public void testFindAll() {
        // arrange
        Mockito.when(criteriaUtil.findAll(ProjectType.class)).thenReturn(new ArrayList<ProjectType>());

        // act
        this.projectTypeDaoImpl.findAll();

        // assert
        Mockito.verify(criteriaUtil).findAll(ProjectType.class);
    }

    @Test
    public void testCount() {
        // arrange
        Mockito.when(criteriaUtil.count(ProjectType.class)).thenReturn(10L);

        // act
        Long count = this.projectTypeDaoImpl.count();

        // assert
        Mockito.verify(criteriaUtil).count(ProjectType.class);
        assertThat(count, is(Long.valueOf(10)));
    }

    @Test
    public void testfind() {
        // arrange
        Mockito.when(criteriaUtil.find(Matchers.anyObject(), Matchers.anyInt(), Matchers.anyInt()))
                .thenReturn(new ArrayList<ProjectType>());

        // act
        this.projectTypeDaoImpl.find(1, 20);

        // assert
        Mockito.verify(criteriaUtil).find(ProjectType.class, 1, 20);
    }

    private ProjectType buildProjectType() {
        ProjectType projectType = new ProjectType();
        User user = this.buildUser();
        projectType.setId("1");
        projectType.setTitle("Test Title");
        projectType.setCreatedBy(user);
        projectType.setUpdatedAt(LocalDateTime.now());
        projectType.setCreatedAt(LocalDateTime.now());
        return projectType;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("achyutpokhrel@lftechnology.com");
        user.setId("12345");
        user.setName("achyut pokhrel");
        return user;
    }

}