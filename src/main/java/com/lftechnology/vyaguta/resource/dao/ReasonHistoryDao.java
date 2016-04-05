package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.resource.entity.ReasonHistory;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@FunctionalInterface
public interface ReasonHistoryDao {

    public EntityManager getEm();

    public default ReasonHistory save(ReasonHistory reasonHistory) {
        try {
            getEm().persist(reasonHistory);
            getEm().flush();
            getEm().refresh(reasonHistory);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(), persistenceException.getCause());
        }
        return reasonHistory;
    }

    public default List<ReasonHistory> findAll() {
        CriteriaBuilder criteriaBuilder = getEm().getCriteriaBuilder();
        CriteriaQuery<ReasonHistory> criteriaQuery = criteriaBuilder.createQuery(ReasonHistory.class);
        Root<ReasonHistory> from = criteriaQuery.from(ReasonHistory.class);
        CriteriaQuery<ReasonHistory> select = criteriaQuery.select(from);
        TypedQuery<ReasonHistory> typedQuery = getEm().createQuery(select);
        return typedQuery.getResultList();
    }
}
