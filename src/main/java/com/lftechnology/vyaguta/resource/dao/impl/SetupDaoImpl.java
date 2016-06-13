package com.lftechnology.vyaguta.resource.dao.impl;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.pojo.ErrorMessage;
import com.lftechnology.vyaguta.resource.dao.SetupDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.entity.Setup;

public class SetupDaoImpl implements SetupDao {

    @Inject
    private EntityManager em;

    @Override
    public Role getDefaultRole() {
        try {
            return em.createNamedQuery(Setup.GET_DEFAULT_ROLE, Role.class).getSingleResult();
        } catch (NoResultException | NonUniqueResultException e) {
            ErrorMessage error = new ErrorMessage("Ensure that default role is properly defined");
            throw new DataAccessException(error.toString());
        }
    }

}
