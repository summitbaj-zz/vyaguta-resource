package com.lftechnology.vyaguta.resource.dao.impl;

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

}
