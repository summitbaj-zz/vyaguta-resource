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
import com.lftechnology.vyaguta.resource.entity.Tag;

public class TagDaoImplTest {

    @Mock
    private EntityManager em;

    @Mock
    private CriteriaUtil<Tag> criteriaUtil;

    @InjectMocks
    private TagDaoImpl tagDaoImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSave() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.doNothing().when(em).persist(tag);
        Mockito.doNothing().when(em).flush();

        // act
        Tag resultTag = this.tagDaoImpl.save(tag);

        // assert
        Mockito.verify(em).persist(tag);
        Mockito.verify(em).flush();
        assertThat(resultTag, is(tag));
    }

    @Test(expected = DataAccessException.class)
    public void testSaveExpectDataAccessException() {
        // arrange
        Tag tag = new Tag();
        Mockito.doThrow(PersistenceException.class).when(em).persist(tag);

        // act
        this.tagDaoImpl.save(tag);
    }

    @Test
    public void testUpdate() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.when(em.merge(tag)).thenReturn(tag);
        Mockito.doNothing().when(em).flush();

        // act
        Tag resultTag = this.tagDaoImpl.update(tag);

        // assert
        Mockito.verify(em).merge(tag);
        Mockito.verify(em).flush();
        assertThat(resultTag, is(tag));
    }

    @Test(expected = DataAccessException.class)
    public void testUpdateExpectDataAccessException() {

        // arrange
        Mockito.doThrow(PersistenceException.class).when(em).merge(Matchers.anyObject());

        // act
        this.tagDaoImpl.update(Matchers.anyObject());
    }

    @Test
    public void testRemove() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.doNothing().when(em).remove(tag);
        Mockito.when(em.merge(tag)).thenReturn(tag);

        // act
        this.tagDaoImpl.remove(tag);

        // assert
        Mockito.verify(em).merge(tag);
        Mockito.verify(em).remove(tag);
    }

    @Test(expected = DataAccessException.class)
    public void testRemoveExpectDataAccessException() {

        // arrange
        Tag tag = new Tag();
        Mockito.doThrow(PersistenceException.class).when(em).merge(tag);

        // act
        this.tagDaoImpl.remove(tag);
    }

    // @Test
    public void testFindById() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.when(em.find(Matchers.anyObject(), Matchers.anyString())).thenReturn(tag);

        // act
        Tag resultTag = this.tagDaoImpl.findById("asdf");

        // assert
        assertThat(resultTag, is(tag));
    }

    @Test
    public void testFindAll() {
        // arrange
        Mockito.when(criteriaUtil.findAll(Tag.class)).thenReturn(new ArrayList<Tag>());

        // act
        this.tagDaoImpl.findAll();

        // assert
        Mockito.verify(criteriaUtil).findAll(Tag.class);
    }

    @Test
    public void testCount() {
        // arrange
        Mockito.when(criteriaUtil.count(Tag.class)).thenReturn(10L);

        // act
        Long count = this.tagDaoImpl.count();

        // assert
        Mockito.verify(criteriaUtil).count(Tag.class);
        assertThat(count, is(Long.valueOf(10)));
    }

    @Test
    public void testfind() {
        // arrange
        Mockito.when(criteriaUtil.find(Matchers.anyObject(), Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<Tag>());

        // act
        this.tagDaoImpl.find(1, 20);

        // assert
        Mockito.verify(criteriaUtil).find(Tag.class, 1, 20);
    }

    private Tag buildTag() {
        Tag tag = new Tag();
        User user = this.buildUser();
        tag.setId("1");
        tag.setTitle("Test Title");
        tag.setCreatedBy(user);
        tag.setUpdatedAt(LocalDateTime.now());
        tag.setCreatedAt(LocalDateTime.now());
        return tag;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("achyutpokhrel@lftechnology.com");
        user.setId("12345");
        user.setName("achyut pokhrel");
        return user;
    }
}
