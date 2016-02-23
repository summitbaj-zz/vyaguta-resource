package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.Query;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class TagDaoImpl extends BaseDao<Tag, String>implements TagDao {

    @Inject
    private CriteriaUtil<Tag> criteriaUtil;

    @Override
    public List<Tag> findAll() {
        return criteriaUtil.findAll(Tag.class);
    }

    @Override
    public Long count() {
        return criteriaUtil.count(Tag.class);
    }

    @Override
    public List<Tag> find(Integer start, Integer offset) {
        return criteriaUtil.find(Tag.class, start, offset);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Tag> findByTitle(String title) {
        Query querySearchByTitle = em.createNamedQuery("Tags.SearchbyTitle", Tag.class);
        querySearchByTitle.setParameter("title", "%" + title.toUpperCase() + "%");
        return querySearchByTitle.getResultList();
    }
}
