package com.lftechnology.vyaguta.resource.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.resource.entity.ContractHistory;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@FunctionalInterface
public interface ContractHistoryDao {

    public EntityManager getEm();

    public default ContractHistory save(ContractHistory contractHistory) {
        try {
            getEm().persist(contractHistory);
            getEm().flush();
            getEm().refresh(contractHistory);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(), persistenceException.getCause());
        }
        return contractHistory;
    }

    public default List<ContractHistory> findAll() {
        CriteriaBuilder criteriaBuilder = getEm().getCriteriaBuilder();
        CriteriaQuery<ContractHistory> criteriaQuery = criteriaBuilder.createQuery(ContractHistory.class);
        Root<ContractHistory> from = criteriaQuery.from(ContractHistory.class);
        CriteriaQuery<ContractHistory> select = criteriaQuery.select(from);
        TypedQuery<ContractHistory> typedQuery = getEm().createQuery(select);
        return typedQuery.getResultList();
    }

    public default List<ContractHistory> findHistory(Project project) {
        return getEm().createNamedQuery(ContractHistory.FIND_BY_PROJECT, ContractHistory.class).setParameter("project", project)
                .getResultList();
    };
}
