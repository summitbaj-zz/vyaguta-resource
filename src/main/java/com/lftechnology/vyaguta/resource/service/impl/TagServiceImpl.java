package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
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
    public Tag merge(UUID id, Tag obj) {
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
    public void removeById(UUID id) {
        Tag tag = this.findById(id);
        if (tag == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(tag);
    }

    @Override
    public Tag findById(UUID id) {
        return tagDao.findById(id);
    }

    @Override
    public List<Tag> findAll() {
        return tagDao.findAll();
    }

    @Override
    public Long count() {
        return tagDao.count(null);
    }

    @Override
    public List<Tag> find(Integer start, Integer offset) {
        return tagDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", tagDao.count(queryParameters));
                put("data", tagDao.findByFilter(queryParameters));
            }
        };
    }
}
