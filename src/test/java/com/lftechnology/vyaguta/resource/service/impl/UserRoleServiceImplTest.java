package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.SetupDao;
import com.lftechnology.vyaguta.resource.dao.UserRoleDao;
import com.lftechnology.vyaguta.resource.entity.Role;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class UserRoleServiceImplTest {

    @InjectMocks
    private UserRoleServiceImpl userRoleServiceImpl;

    @Mock
    private UserRoleDao userRoleDao;

    @Mock
    private SetupDao setUpDao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindRolesOfUserWhenUserIsNew() {

        // arrange
        UUID userid = GuidUtil.generate();
        UUID roleId = GuidUtil.generate();

        User user = new User();
        user.setId(userid);

        Role role = new Role();
        role.setId(roleId);
        role.setTitle("Admin");

        Mockito.when(userRoleDao.findRolesOfUser(user)).thenReturn(new ArrayList<Role>());
        Mockito.when(setUpDao.getDefaultRole()).thenReturn(role);
        // act
        List<com.lftechnology.vyaguta.commons.pojo.CommonRole> roles = userRoleServiceImpl.findRolesOfUser(user);

        // assert
        assertThat(roles.size(), is(1));
        assertThat(roles.get(0).getRole(), is("Admin"));

    }

}
