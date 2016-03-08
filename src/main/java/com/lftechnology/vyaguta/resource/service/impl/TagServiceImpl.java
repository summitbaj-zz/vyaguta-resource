package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.service.TagService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class TagServiceImpl implements TagService {

    @Inject
    private TagDao tagDao;

    @Override
    public Tag save(Tag tag) {
        return tagDao.save(tag);
    }

    @Override
    public Tag update(Tag tag) {
        return tagDao.update(tag);
    }

    @Override
    public Tag merge(String id, Tag obj) {
        Tag tag = this.findById(id);
        if (tag == null) {
            throw new ObjectNotFoundException();
        }
        tag.setTitle(obj.getTitle());
        return this.update(tag);
    }

    @Override
    public void remove(Tag tag) {
        tagDao.remove(tag);

    }

    @Override
    public void removeById(String id) {
        Tag tag = this.findById(id);
        if (tag == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(tag);
    }

    @Override
    public Tag findById(String id) {
        return tagDao.findById(id);
    }

    @Override
    public List<Tag> findAll() {
        return tagDao.findAll();
    }

    @Override
    public Long count() {
        return tagDao.count();
    }

    @Override
    public List<Tag> find(Integer start, Integer offset) {
        return tagDao.find(start, offset);
    }

    @Override
    public List<Tag> findByTitle(String title) {
        return tagDao.findByTitle(title);
    }

    @Override
    public List<Tag> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return tagDao.findByFilter(queryParameters);
    }
}
