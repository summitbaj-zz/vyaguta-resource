package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class TagDaoImpl extends BaseDao<Tag, String>implements TagDao {

    public TagDaoImpl() {
        super(Tag.class);
    }

    @Override
    public List<Tag> findByTitle(String title) {
        return em.createNamedQuery(Tag.findByTitle, Tag.class).setParameter("title", "%" + title.toUpperCase() + "%").getResultList();
    }
}
