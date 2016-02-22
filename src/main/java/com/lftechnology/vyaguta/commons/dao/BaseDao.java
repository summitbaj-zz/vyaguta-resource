package com.lftechnology.vyaguta.commons.dao;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;

/**
 * @author Anish Krishna Manandhar<anishmanandhar@lftechnology.com>
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public abstract class BaseDao<T, Pk> {

  @Inject
  protected EntityManager em;

  /**
   * Construct proper dao exception messages
   * 
   * @param throwable
   * @return
   */
  public static ErrorMessage constructErrorMessage(Throwable throwable) {
    String message = ExceptionUtils.getRootCauseMessage(throwable);
    ErrorMessage errorMessage = new ErrorMessage(message);
    if (message.contains("duplicate key value violates unique constraint")) {
      message = StringUtils.substringAfter(message, "Detail: Key ");
      String[] messages = message.split("=");
      if (messages != null && messages.length > 1) {
        errorMessage.setError(messages[1]);
      }
    } else if (message.contains("violates foreign key constraint")) {
      message = StringUtils.substringBetween(message, "=(", ")");
      errorMessage.setError(message + " violates foreign key constraint");
    }
    return errorMessage;
  }

  public T save(T entity) {
    try {
      em.persist(entity);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return entity;
  }

  public T update(T entity) {
    try {
      em.merge(entity);
      em.flush();
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
    return entity;
  }

  public void remove(T entity) {
    try {
      em.remove(em.merge(entity));
    } catch (PersistenceException persistenceException) {
      throw new DataAccessException(constructErrorMessage(persistenceException).toString(),
          persistenceException.getCause());
    }
  }

  public T findById(Class<T> entity, Pk id) {
    return (T) em.find(entity, id);
  }
}
