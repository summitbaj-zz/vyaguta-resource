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
import com.lftechnology.vyaguta.resource.entity.ProjectHistoryRoot;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@FunctionalInterface
public interface ProjectHistoryRootDao {

    public EntityManager getEm();

    public default ProjectHistoryRoot save(ProjectHistoryRoot projectHistoryRoot) {
        try {
            getEm().persist(projectHistoryRoot);
            getEm().flush();
            getEm().refresh(projectHistoryRoot);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(), persistenceException.getCause());
        }
        return projectHistoryRoot;
    }

    public default List<ProjectHistoryRoot> findAll() {
        CriteriaBuilder criteriaBuilder = getEm().getCriteriaBuilder();
        CriteriaQuery<ProjectHistoryRoot> criteriaQuery = criteriaBuilder.createQuery(ProjectHistoryRoot.class);
        Root<ProjectHistoryRoot> from = criteriaQuery.from(ProjectHistoryRoot.class);
        CriteriaQuery<ProjectHistoryRoot> select = criteriaQuery.select(from);
        TypedQuery<ProjectHistoryRoot> typedQuery = getEm().createQuery(select);
        return typedQuery.getResultList();
    }
}
