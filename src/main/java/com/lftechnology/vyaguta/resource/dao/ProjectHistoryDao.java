package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectHistory;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@FunctionalInterface
public interface ProjectHistoryDao {

    public default ProjectHistory save(ProjectHistory projectHistory) {
        try {
            getEm().persist(projectHistory);
            getEm().flush();
            getEm().refresh(projectHistory);
        } catch (PersistenceException persistenceException) {
            throw new DataAccessException(BaseDao.constructErrorMessage(persistenceException).toString(),
                    persistenceException.getCause());
        }
        return projectHistory;
    }

    public default List<ProjectHistory> findAll() {
        CriteriaBuilder criteriaBuilder = getEm().getCriteriaBuilder();
        CriteriaQuery<ProjectHistory> criteriaQuery = criteriaBuilder.createQuery(ProjectHistory.class);
        Root<ProjectHistory> from = criteriaQuery.from(ProjectHistory.class);
        CriteriaQuery<ProjectHistory> select = criteriaQuery.select(from);
        TypedQuery<ProjectHistory> typedQuery = getEm().createQuery(select);
        return typedQuery.getResultList();
    }

    public EntityManager getEm();

    public default List<ProjectHistory> findHistory(Project project) {
        return getEm().createNamedQuery(ProjectHistory.FIND_BY_PROJECT, ProjectHistory.class)
                .setParameter("project", project).getResultList();
    };

    public default ProjectHistory findMostRecent(Project project) {
        String jpql = "SELECT ph FROM ProjectHistory ph WHERE ph.project=:project ORDER BY ph.batch.createdAt DESC";
        try {
            return getEm().createQuery(jpql, ProjectHistory.class).setParameter("project", project).setMaxResults(1)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}
