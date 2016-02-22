package com.lftechnology.vyaguta.resource.dao.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

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
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectStatusDaoImplTest {

  @Mock
  EntityManager em;

  @Mock
  CriteriaUtil<ProjectStatus> criteriaUtil;

  @InjectMocks
  private ProjectStatusDaoImpl projectStatusDaoImpl;

  @Before
  public void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testSave() {

    // arrange
    ProjectStatus projectStatus = this.buildProjectStatus();
    Mockito.doNothing().when(em).persist(projectStatus);
    Mockito.doNothing().when(em).flush();

    // act
    ProjectStatus resultProjectStatus = this.projectStatusDaoImpl.save(projectStatus);

    // assert
    Mockito.verify(em).persist(projectStatus);
    Mockito.verify(em).flush();
    assertThat(resultProjectStatus, is(projectStatus));
  }

  @Test(expected = DataAccessException.class)
  public void testSaveExpectDataAccessException() {
    // arrange
    ProjectStatus projectStatus = new ProjectStatus();
    Mockito.doThrow(PersistenceException.class).when(em).persist(projectStatus);

    // act
    this.projectStatusDaoImpl.save(projectStatus);
  }

  @Test
  public void testUpdate() {

    // arrange
    ProjectStatus projectStatus = this.buildProjectStatus();
    Mockito.when(em.merge(projectStatus)).thenReturn(projectStatus);
    Mockito.doNothing().when(em).flush();

    // act
    ProjectStatus resultProjectStatus = this.projectStatusDaoImpl.update(projectStatus);

    // assert
    Mockito.verify(em).merge(projectStatus);
    Mockito.verify(em).flush();
    assertThat(resultProjectStatus, is(projectStatus));
  }

  @Test(expected = DataAccessException.class)
  public void testUpdateExpectDataAccessException() {

    // arrange
    Mockito.doThrow(PersistenceException.class).when(em).merge(Matchers.anyObject());

    // act
    this.projectStatusDaoImpl.update(Matchers.anyObject());
  }

  @Test
  public void testRemove() {

    // arrange
    ProjectStatus projectStatus = this.buildProjectStatus();
    Mockito.doNothing().when(em).remove(projectStatus);
    Mockito.when(em.merge(projectStatus)).thenReturn(projectStatus);

    // act
    this.projectStatusDaoImpl.remove(projectStatus);

    // assert
    Mockito.verify(em).merge(projectStatus);
    Mockito.verify(em).remove(projectStatus);
  }

  @Test(expected = DataAccessException.class)
  public void testRemoveExpectDataAccessException() {

    // arrange
    ProjectStatus projectStatus = new ProjectStatus();
    Mockito.doThrow(PersistenceException.class).when(em).merge(projectStatus);

    // act
    this.projectStatusDaoImpl.remove(projectStatus);
  }

  // @Test
  public void testFindById() {

    // arrange
    ProjectStatus projectStatus = this.buildProjectStatus();
    Mockito.when(em.find(Matchers.anyObject(), Matchers.anyString())).thenReturn(projectStatus);

    // act
    ProjectStatus resultProjectStatus = this.projectStatusDaoImpl.findById(ProjectStatus.class, "asdf");

    // assert
    assertThat(resultProjectStatus, is(projectStatus));
  }

  @Test
  public void testFindAll() {
    // arrange
    Mockito.when(criteriaUtil.findAll(ProjectStatus.class)).thenReturn(new ArrayList<ProjectStatus>());

    // act
    this.projectStatusDaoImpl.findAll();

    // assert
    Mockito.verify(criteriaUtil).findAll(ProjectStatus.class);
  }

  @Test
  public void testCount() {
    // arrange
    Mockito.when(criteriaUtil.count(ProjectStatus.class)).thenReturn(10L);

    // act
    Long count = this.projectStatusDaoImpl.count();

    // assert
    Mockito.verify(criteriaUtil).count(ProjectStatus.class);
    assertThat(count, is(Long.valueOf(10)));
  }

  @Test
  public void testfind() {
    // arrange
    Mockito.when(criteriaUtil.find(Matchers.anyObject(), Matchers.anyInt(), Matchers.anyInt()))
        .thenReturn(new ArrayList<ProjectStatus>());

    // act
    this.projectStatusDaoImpl.find(1, 20);

    // assert
    Mockito.verify(criteriaUtil).find(ProjectStatus.class, 1, 20);
  }

  private ProjectStatus buildProjectStatus() {
    ProjectStatus projectStatus = new ProjectStatus();
    User user = this.buildUser();
    projectStatus.setId("1");
    projectStatus.setTitle("Test Title");
    projectStatus.setCreatedBy(user);
    projectStatus.setUpdatedAt(LocalDateTime.now());
    projectStatus.setCreatedAt(LocalDateTime.now());
    return projectStatus;
  }

  private User buildUser() {
    User user = new User();
    user.setEmail("achyutpokhrel@lftechnology.com");
    user.setId("12345");
    user.setName("achyut pokhrel");
    return user;
  }

}
