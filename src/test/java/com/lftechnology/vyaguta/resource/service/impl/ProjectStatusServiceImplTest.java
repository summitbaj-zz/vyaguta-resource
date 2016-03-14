package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotEquals;
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
import com.lftechnology.vyaguta.resource.dao.ProjectStatusDao;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectStatusServiceImplTest {

    @Spy
    @InjectMocks
    private ProjectStatusServiceImpl projectStatusServiceImpl;

    @Mock
    private ProjectStatusDao projectStatusDao;

    private final String testId = "asdf";

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveWhenProjectStatusIsValidObject() {

        // arrange
        ProjectStatus projectStatus = this.buildProjectStatus();
        Mockito.when(projectStatusDao.save(projectStatus)).thenReturn(projectStatus);

        // act
        ProjectStatus resultProjectStatus = this.projectStatusServiceImpl.save(projectStatus);

        // assert
        Mockito.verify(projectStatusDao).save(projectStatus);
        assertThat(resultProjectStatus, is(projectStatus));
    }

    @Test
    public void testUpdate() {

        // arrange
        ProjectStatus projectStatus = this.buildProjectStatus();
        Mockito.when(this.projectStatusDao.update(projectStatus)).thenReturn(projectStatus);

        // act
        ProjectStatus resultProjectStatus = this.projectStatusServiceImpl.update(projectStatus);

        // assert
        Mockito.verify(projectStatusDao).update(projectStatus);
        assertThat(resultProjectStatus, is(projectStatus));
    }

    @Test(expected = ObjectNotFoundException.class)
    public void testMergeWhenIdIsNotValid() {

        // arrange
        Mockito.when(this.projectStatusDao.findById(testId)).thenReturn(null);
        ProjectStatus projectStatus = new ProjectStatus();

        // act
        this.projectStatusServiceImpl.merge(testId, projectStatus);

    }

    @Test
    public void testMergeWhenIdIsValidAndObjectIsValid() {

        // arrange
        ProjectStatus projectStatusNew = this.buildProjectStatus();
        ProjectStatus projectStatusOld = this.buildProjectStatus();
        projectStatusOld.setTitle("Title old");
        projectStatusOld.setColor("#333444");
        Mockito.when(projectStatusDao.findById(testId)).thenReturn(projectStatusOld);
        Mockito.when(projectStatusDao.update(projectStatusNew)).thenReturn(projectStatusNew);

        // act
        ProjectStatus result = this.projectStatusServiceImpl.merge(testId, projectStatusNew);

        // assert
        assertThat(result.getTitle(), is(projectStatusNew.getTitle()));
        assertThat(result.getColor(), is(projectStatusNew.getColor()));
        Mockito.verify(projectStatusDao).findById(testId);
        Mockito.verify(projectStatusDao).update(projectStatusOld);
    }

    @Test
    public void testRemove() {

        // arrange
        ProjectStatus projectStatus = new ProjectStatus();
        Mockito.doNothing().when(projectStatusDao).remove(projectStatus);

        // act
        this.projectStatusServiceImpl.remove(projectStatus);

        // assert
        Mockito.verify(projectStatusDao).remove(projectStatus);
    }

    @Test(expected = ObjectNotFoundException.class)
    public void testRemoveByIdWhenIdIsNotValid() {

        // arrange
        Mockito.when(this.projectStatusServiceImpl.findById(testId)).thenReturn(null);

        // act
        this.projectStatusServiceImpl.removeById(testId);
    }

    @Test
    public void testRemoveByIdWhenIdIsValid() {

        // arrange
        ProjectStatus projectStatus = this.buildProjectStatus();
        Mockito.when(projectStatusDao.findById(testId)).thenReturn(projectStatus);
        Mockito.doNothing().when(projectStatusServiceImpl).remove(projectStatus);

        // act
        this.projectStatusServiceImpl.removeById(testId);

        // assert
        Mockito.verify(this.projectStatusServiceImpl).remove(projectStatus);
        Mockito.verify(this.projectStatusDao).findById(testId);
    }

    @Test
    public void testfindById() {

        // arrange
        Mockito.when(projectStatusDao.findById(testId)).thenReturn(new ProjectStatus());

        // act
        this.projectStatusServiceImpl.findById(testId);

        // assert
        Mockito.verify(projectStatusDao).findById(testId);
    }

    @Test
    public void testFindAll() {

        // arrange
        Mockito.when(projectStatusDao.findAll()).thenReturn(new ArrayList<ProjectStatus>());

        // act
        this.projectStatusDao.findAll();

        // assert
        Mockito.verify(projectStatusDao).findAll();
    }

    @Test
    public void testCount() {

        // arrange
        Mockito.when(projectStatusDao.count(null)).thenReturn(10L);

        // act
        Long result = this.projectStatusDao.count(null);

        // assert
        Mockito.verify(projectStatusDao).count(null);
        assertThat(result, is(Long.valueOf(10)));
    }

    @Test
    public void testFind() {

        // arrange
        Mockito.when(projectStatusDao.find(Matchers.anyInt(), Matchers.anyInt()))
                .thenReturn(new ArrayList<ProjectStatus>());

        // act
        this.projectStatusServiceImpl.find(2, 20);

        // assert
        Mockito.verify(projectStatusDao).find(Matchers.anyInt(), Matchers.anyInt());

    }

    private ProjectStatus buildProjectStatus() {
        ProjectStatus projectStatus = new ProjectStatus();
        User user = this.buildUser();
        projectStatus.setId("1");
        projectStatus.setTitle("Test Title");
        projectStatus.setColor("#eeefff");
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
