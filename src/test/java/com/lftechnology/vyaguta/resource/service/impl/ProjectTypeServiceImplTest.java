package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectTypeDao;
import com.lftechnology.vyaguta.resource.entity.ProjectType;;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectTypeServiceImplTest {
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
    ProjectType resultProjectType = projectTypeServiceImpl.save(projectType);

    // assert
    Mockito.verify(projectTypeDao).save(projectType);
    assertThat(resultProjectType, is(projectType));
  }

  private ProjectType buildProjectType() {
    ProjectType projectType = new ProjectType();
    User user = buildUser();
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
