package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class TagDaoImpl extends BaseDao implements TagDao {

  @Inject
  private CriteriaUtil<Tag> criteriaUtil;

  @Override
  public Tag save(Tag tag) {
    try {
      em.persist(tag);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return tag;
  }

  @Override
  public Tag update(Tag tag) {
    try {
      em.merge(tag);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return tag;
  }

  @Override
  public void remove(Tag tag) {
    try {
      em.remove(em.merge(tag));
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
  }

  @Override
  public Tag findById(String id) {
    return em.find(Tag.class, id);
  }

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
