package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ProjectRoleDao;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@RunWith(MockitoJUnitRunner.class)
public class ProjectRoleServiceImplTest {

    private static final String ID = "0f9cf012de5f492991bb0ca7214064a8";
    private static final Long COUNT = 20L;

    @Mock
    private ProjectRoleDao projectRoleDao;

    @InjectMocks
    @Spy
    private ProjectRoleServiceImpl projectRoleService;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveProjectRole() {
        // arrange
        ProjectRole projectRole = this.buildProjectRole();
        Mockito.when(this.projectRoleDao.save(projectRole)).thenReturn(projectRole);

        // act
        ProjectRole resultProjectRole = this.projectRoleService.save(projectRole);

        // assert
        Mockito.verify(projectRoleDao).save(projectRole);
        assertThat(resultProjectRole, is(projectRole));
    }

    @Test
    public void testUpdateProjectRole() {
        // arrange
        ProjectRole projectRole = new ProjectRole();
        Mockito.when(this.projectRoleDao.update(Matchers.any(ProjectRole.class))).thenReturn(projectRole);

        // act
        this.projectRoleService.update(projectRole);

        // assert
        Mockito.verify(projectRoleDao).update(projectRole);

    }

    @Test
    public void testMergeProjectRole() {
        // arrange
        ProjectRole projectRole = this.buildProjectRole();
        Mockito.when(this.projectRoleDao.findById(Matchers.anyString())).thenReturn(projectRole);
        Mockito.when(this.projectRoleService.findById(Matchers.anyString())).thenReturn(projectRole);

        // act
        this.projectRoleService.merge(ID, projectRole);

        // assert
        Mockito.verify(projectRoleDao).update(projectRole);
    }

    @Test
    public void testMergeWhenObjectNotFoundException() {

        // arrange
        ProjectRole projectRole = new ProjectRole();
        Mockito.when(this.projectRoleDao.findById(Matchers.anyString())).thenReturn(null);
        exception.expect(ObjectNotFoundException.class);

        // act
        this.projectRoleService.merge(ID, projectRole);

    }

    @Test
    public void testRemoveProjectRole() {
        // arrange
        ProjectRole projectRole = this.buildProjectRole();
        Mockito.doNothing().when(this.projectRoleDao).remove(projectRole);

        // act
        this.projectRoleService.remove(projectRole);

        // assert
        Mockito.verify(projectRoleDao).remove(projectRole);
    }

    @Test
    public void testRemoveProjectRoleById() {
        // arrange
        ProjectRole projectRole = this.buildProjectRole();
        Mockito.when(this.projectRoleDao.findById(Matchers.anyString())).thenReturn(projectRole);
        Mockito.when(this.projectRoleService.findById(Matchers.anyString())).thenReturn(projectRole);

        // act
        this.projectRoleService.removeById(ID);

        // assert
        Mockito.verify(projectRoleService).remove(projectRole);

    }

    @Test
    public void testRemoveProjectRoleByIdWhenObjectNotFoundException() {
        // arrange
        Mockito.when(this.projectRoleService.findById(Matchers.anyString())).thenReturn(null);
        exception.expect(ObjectNotFoundException.class);
        // act
        this.projectRoleService.removeById(ID);

    }

    @Test
    public void findProjectRoleById() {
        // arrange
        Mockito.when(this.projectRoleDao.findById(Matchers.anyString())).thenReturn(new ProjectRole());

        // act
        this.projectRoleService.findById(ID);

        // assert
        Mockito.verify(projectRoleDao).findById(Matchers.anyString());

    }

    @Test
    public void testFindAllProjectRole() {
        // arrange
        Mockito.when(this.projectRoleDao.findAll()).thenReturn(new ArrayList<ProjectRole>());

        // act
        this.projectRoleService.findAll();

        // assert
        Mockito.verify(projectRoleDao).findAll();
    }

    @Test
    public void testCountProjectRole() {
        // arrange
        Mockito.when(this.projectRoleDao.count(null)).thenReturn(COUNT);

        // act
        Long result = this.projectRoleService.count();

        // assert
        Mockito.verify(projectRoleDao).count(null);
        assertEquals(Long.valueOf("20"), result);
    }

    @Test
    public void testFindProjectRole() {
        // arrange
        Mockito.when(this.projectRoleDao.find(Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<ProjectRole>());

        // act
        this.projectRoleService.find(Matchers.anyInt(), Matchers.anyInt());

        // assert
        Mockito.verify(projectRoleDao).find(Matchers.anyInt(), Matchers.anyInt());
    }

    private ProjectRole buildProjectRole() {
        ProjectRole projectRole = new ProjectRole();
        User user = this.buildUser();
        projectRole.setId(ID);
        projectRole.setTitle("Developer");
        projectRole.setCreatedBy(user);
        projectRole.setUpdatedAt(LocalDateTime.now());
        projectRole.setCreatedAt(LocalDateTime.now());
        return projectRole;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("krishnatimilsina@lftechnology.com");
        user.setId(ID);
        user.setName("Krishna Timilsina");
        return user;
    }
}
