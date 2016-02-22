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
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;

public class TagServiceImplTest {

  @Spy
  @InjectMocks
  private TagServiceImpl tagServiceImpl;

  @Mock
  private TagDao tagDao;

  private final String testId = "asdf";

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
    Mockito.when(this.tagDao.findById(Tag.class, testId)).thenReturn(null);
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
    Mockito.when(tagDao.findById(Tag.class, testId)).thenReturn(tagOld);

    // act
    this.tagServiceImpl.merge(testId, tagNew);

    // assert
    assertThat(tagOld.getTitle(), is(tagNew.getTitle()));
    Mockito.verify(tagDao).findById(Tag.class, testId);
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
    Mockito.when(tagDao.findById(Tag.class, testId)).thenReturn(tag);
    Mockito.doNothing().when(tagServiceImpl).remove(tag);

    // act
    this.tagServiceImpl.removeById(testId);

    // assert
    Mockito.verify(this.tagServiceImpl).remove(tag);
    Mockito.verify(this.tagDao).findById(Tag.class, testId);
  }

  @Test
  public void testfindById() {

    // arrange
    Mockito.when(tagDao.findById(Tag.class, testId)).thenReturn(new Tag());

    // act
    this.tagServiceImpl.findById(testId);

    // assert
    Mockito.verify(tagDao).findById(Tag.class, testId);
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
    Mockito.when(tagDao.count()).thenReturn(10L);

    // act
    Long result = this.tagServiceImpl.count();

    // assert
    Mockito.verify(tagDao).count();
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
