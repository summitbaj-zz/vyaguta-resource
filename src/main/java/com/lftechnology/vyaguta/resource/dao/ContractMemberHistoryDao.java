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
import com.lftechnology.vyaguta.resource.entity.ContractMemberHistory;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@FunctionalInterface
public interface ContractMemberHistoryDao {

    public EntityManager getEm();

    public default ContractMemberHistory save(ContractMemberHistory contractMemberHistory) {
        try {
            getEm().persist(contractMemberHistory);
            getEm().flush();
            getEm().refresh(contractMemberHistory);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(), persistenceException.getCause());
        }
        return contractMemberHistory;
    }

    public default List<ContractMemberHistory> findAll() {
        CriteriaBuilder criteriaBuilder = getEm().getCriteriaBuilder();
        CriteriaQuery<ContractMemberHistory> criteriaQuery = criteriaBuilder.createQuery(ContractMemberHistory.class);
        Root<ContractMemberHistory> from = criteriaQuery.from(ContractMemberHistory.class);
        CriteriaQuery<ContractMemberHistory> select = criteriaQuery.select(from);
        TypedQuery<ContractMemberHistory> typedQuery = getEm().createQuery(select);
        return typedQuery.getResultList();
    }

    public default List<ContractMemberHistory> findHistory(Project project) {
        return getEm().createNamedQuery(ContractMemberHistory.FIND_BY_PROJECT, ContractMemberHistory.class)
                .setParameter("project", project).getResultList();
    };

}
