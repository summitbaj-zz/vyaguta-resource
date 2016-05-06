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
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;

public class TagServiceImplTest {

    @Spy
    @InjectMocks
    private TagServiceImpl tagServiceImpl;

    @Mock
    private TagDao tagDao;

    private final UUID testId = UUID.randomUUID();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveWhenTagIsValidObject() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.when(tagDao.save(tag)).thenReturn(tag);

        // act
        Tag resultTag = this.tagServiceImpl.save(tag);

        // assert
        Mockito.verify(tagDao).save(tag);
        assertThat(resultTag, is(tag));
    }

    @Test
    public void testUpdate() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.when(this.tagDao.update(tag)).thenReturn(tag);

        // act
        Tag resultTag = this.tagServiceImpl.update(tag);

        // assert
        Mockito.verify(tagDao).update(tag);
        assertThat(resultTag, is(tag));
    }

    @Test(expected = ObjectNotFoundException.class)
    public void testMergeWhenIdIsNotValid() {

        // arrange
        Mockito.when(this.tagDao.findById(testId)).thenReturn(null);
        Tag tag = new Tag();

        // act
        this.tagServiceImpl.merge(testId, tag);

    }

    @Test
    public void testMergeWhenIdIsValidAndObjectIsValid() {

        // arrange
        Tag tagNew = this.buildTag();
        Tag tagOld = this.buildTag();
        tagOld.setTitle("Title old");
        Mockito.when(tagDao.findById(testId)).thenReturn(tagOld);

        // act
        this.tagServiceImpl.merge(testId, tagNew);

        // assert
        assertThat(tagOld.getTitle(), is(tagNew.getTitle()));
        Mockito.verify(tagDao).findById(testId);
        Mockito.verify(tagServiceImpl).update(tagOld);
    }

    @Test
    public void testRemove() {

        // arrange
        Tag tag = new Tag();
        Mockito.doNothing().when(tagDao).remove(tag);

        // act
        this.tagServiceImpl.remove(tag);

        // assert
        Mockito.verify(tagDao).remove(tag);
    }

    @Test(expected = ObjectNotFoundException.class)
    public void testRemoveByIdWhenIdIsNotValid() {

        // arrange
        Mockito.when(this.tagServiceImpl.findById(testId)).thenReturn(null);

        // act
        this.tagServiceImpl.removeById(testId);
    }

    @Test
    public void testRemoveByIdWhenIdIsValid() {

        // arrange
        Tag tag = this.buildTag();
        Mockito.when(tagDao.findById(testId)).thenReturn(tag);
        Mockito.doNothing().when(tagServiceImpl).remove(tag);

        // act
        this.tagServiceImpl.removeById(testId);

        // assert
        Mockito.verify(this.tagServiceImpl).remove(tag);
        Mockito.verify(this.tagDao).findById(testId);
    }

    @Test
    public void testfindById() {

        // arrange
        Mockito.when(tagDao.findById(testId)).thenReturn(new Tag());

        // act
        this.tagServiceImpl.findById(testId);

        // assert
        Mockito.verify(tagDao).findById(testId);
    }

    @Test
    public void testFindAll() {

        // arrange
        Mockito.when(tagDao.findAll()).thenReturn(new ArrayList<Tag>());

        // act
        this.tagServiceImpl.findAll();

        // assert
        Mockito.verify(tagDao).findAll();
    }

    @Test
    public void testCount() {

        // arrange
        Mockito.when(tagDao.count(null)).thenReturn(10L);

        // act
        Long result = this.tagServiceImpl.count();

        // assert
        Mockito.verify(tagDao).count(null);
        assertThat(result, is(Long.valueOf(10)));
    }

    @Test
    public void testFind() {

        // arrange
        Mockito.when(tagDao.find(Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<Tag>());

        // act
        this.tagServiceImpl.find(2, 20);

        // assert
        Mockito.verify(tagDao).find(Matchers.anyInt(), Matchers.anyInt());

    }

    @Test
    public void testFindByFilter() {

        // arrange
        Map<String, List<String>> multiValue = new HashMap<>();
        multiValue.put("title", Arrays.asList("Java"));
        MultivaluedMap<String, String> queryParameters = new MultivaluedMapImpl<>(multiValue);
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag());

        Mockito.when(tagDao.findByFilter(queryParameters)).thenReturn(tags);
        Mockito.when(tagDao.count(queryParameters)).thenReturn(10L);

        // act
        Map<String, Object> result = this.tagServiceImpl.findByFilter(queryParameters);

        // assert
        assertTrue(result.containsKey("count"));
        assertTrue(result.containsValue(10L));
        assertTrue(result.containsKey("data"));
        assertTrue(result.containsValue(tags));
        Mockito.verify(tagDao).count(queryParameters);
        Mockito.verify(tagDao).findByFilter(queryParameters);
    }

    private Tag buildTag() {
        Tag tag = new Tag();
        User user = this.buildUser();
        tag.setId(UUID.randomUUID());
        tag.setTitle("Test Title");
        tag.setCreatedBy(user);
        tag.setUpdatedAt(LocalDateTime.now());
        tag.setCreatedAt(LocalDateTime.now());
        return tag;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("achyutpokhrel@lftechnology.com");
        user.setId(UUID.randomUUID());
        user.setName("achyut pokhrel");
        return user;
    }
}
