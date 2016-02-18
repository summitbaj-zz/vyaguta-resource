package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectTypeServiceImplTest {

  @Spy
  @InjectMocks
  private ProjectTypeServiceImpl projectTypeServiceImpl;

  @Mock
  private ProjectTypeDao projectTypeDao;

  @Before
  public void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testSaveWhenProjectTypeIsValidObject() {

    // arrange
    ProjectType projectType = this.buildProjectType();
    Mockito.when(projectTypeDao.save(projectType)).thenReturn(projectType);

    // act
    ProjectType resultProjectType = this.projectTypeServiceImpl.save(projectType);

    // assert
    Mockito.verify(projectTypeDao).save(projectType);
    assertThat(resultProjectType, is(projectType));
  }

  @Test
  public void testUpdate() {

    // arrange
    ProjectType projectType = this.buildProjectType();
    Mockito.when(this.projectTypeDao.update(projectType)).thenReturn(projectType);

    // act
    ProjectType resultProjectType = this.projectTypeServiceImpl.update(projectType);

    // assert
    Mockito.verify(projectTypeDao).update(projectType);
    assertThat(resultProjectType, is(projectType));
  }

  @Test(expected = ObjectNotFoundException.class)
  public void testMergeWhenIdIsNotValid() {

    // arrange
    Mockito.when(this.projectTypeDao.findById(Matchers.anyString())).thenReturn(null);
    ProjectType projectType = new ProjectType();
    String id = "id";

    // act
    this.projectTypeServiceImpl.merge(id, projectType);

  }

  @Test
  public void testMergeWhenIdIsValidAndObjectIsValid() {

    // arrange
    ProjectType projectTypeNew = this.buildProjectType();
    ProjectType projectTypeOld = this.buildProjectType();
    projectTypeOld.setTitle("Title old");
    Mockito.when(projectTypeDao.findById(Matchers.anyString())).thenReturn(projectTypeOld);
    String id = "valid id";

    // act
    this.projectTypeServiceImpl.merge(id, projectTypeNew);

    // assert
    assertThat(projectTypeOld.getTitle(), is(projectTypeNew.getTitle()));
    Mockito.verify(projectTypeDao).findById(id);
    Mockito.verify(projectTypeServiceImpl).update(projectTypeOld);
  }

  @Test
  public void testRemove() {

    // arrange
    ProjectType projectType = new ProjectType();
    Mockito.doNothing().when(projectTypeDao).remove(projectType);

    // act
    this.projectTypeServiceImpl.remove(projectType);

    // assert
    Mockito.verify(projectTypeDao).remove(projectType);
  }

  @Test(expected = ObjectNotFoundException.class)
  public void testRemoveByIdWhenIdIsNotValid() {

    // arrange
    Mockito.when(this.projectTypeServiceImpl.findById(Matchers.anyString())).thenReturn(null);
    String id = "id";

    // act
    this.projectTypeServiceImpl.removeById(id);
  }

  @Test
  public void testRemoveByIdWhenIdIsValid() {

    // arrange
    ProjectType projectType = this.buildProjectType();
    Mockito.when(projectTypeDao.findById(Matchers.anyString())).thenReturn(projectType);
    Mockito.doNothing().when(projectTypeServiceImpl).remove(projectType);

    // act
    this.projectTypeServiceImpl.removeById("validId");

    // assert
    Mockito.verify(this.projectTypeServiceImpl).remove(projectType);
    Mockito.verify(this.projectTypeDao).findById(Matchers.anyString());
  }

  @Test
  public void testfindById() {

    // arrange
    Mockito.when(projectTypeDao.findById(Matchers.anyString())).thenReturn(new ProjectType());

    // act
    this.projectTypeServiceImpl.findById("validId");

    // assert
    Mockito.verify(projectTypeDao).findById(Matchers.anyString());
  }

  @Test
  public void testFindAll() {

    // arrange
    Mockito.when(projectTypeDao.findAll()).thenReturn(new ArrayList<ProjectType>());

    // act
    this.projectTypeDao.findAll();

    // assert
    Mockito.verify(projectTypeDao).findAll();
  }

  @Test
  public void testCount() {

    // arrange
    Mockito.when(projectTypeDao.count()).thenReturn(10L);

    // act
    Long result = this.projectTypeDao.count();

    // assert
    Mockito.verify(projectTypeDao).count();
    assertThat(result,is(Long.valueOf(10)));
  }

  @Test
  public void testFind() {

    // arrange
    Mockito.when(projectTypeDao.find(Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<ProjectType>());

    // act
    this.projectTypeServiceImpl.find(2, 20);

    // assert
    Mockito.verify(projectTypeDao).find(Matchers.anyInt(), Matchers.anyInt());

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
