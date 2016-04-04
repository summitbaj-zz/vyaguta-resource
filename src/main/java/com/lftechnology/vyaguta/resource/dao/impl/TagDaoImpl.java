package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.filter.TagFilter;
import com.lftechnology.vyaguta.resource.sort.TagSort;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class TagDaoImpl extends BaseDao<Tag, UUID> implements TagDao {

    private TagSort tagSort = new TagSort();
    private TagFilter tagFilter = new TagFilter();

    public TagDaoImpl() {
        super(Tag.class);
    }

    @Override
    public Map<String, EntitySorter<Tag>> getSortOperations() {
        return tagSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<Tag>> getFilters() {
        return tagFilter.getFilters();
    }

}
