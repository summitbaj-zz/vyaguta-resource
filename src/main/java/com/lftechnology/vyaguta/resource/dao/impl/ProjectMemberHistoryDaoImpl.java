package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.resource.dao.ProjectMemberHistoryDao;
import com.lftechnology.vyaguta.resource.entity.ProjectMemberHistory;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class ProjectMemberHistoryDaoImpl implements ProjectMemberHistoryDao {

    @Inject
    protected EntityManager em;

    @Override
    public ProjectMemberHistory save(ProjectMemberHistory entity) {
        try {
            em.persist(entity);
            em.flush();
            em.refresh(entity);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(), persistenceException.getCause());
        }
        return entity;
    }

    @Override
    public List<ProjectMemberHistory> findAll() {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<ProjectMemberHistory> criteriaQuery = criteriaBuilder.createQuery(ProjectMemberHistory.class);
        Root<ProjectMemberHistory> from = criteriaQuery.from(ProjectMemberHistory.class);
        CriteriaQuery<ProjectMemberHistory> select = criteriaQuery.select(from);
        TypedQuery<ProjectMemberHistory> typedQuery = em.createQuery(select);
        return typedQuery.getResultList();
    }

}
