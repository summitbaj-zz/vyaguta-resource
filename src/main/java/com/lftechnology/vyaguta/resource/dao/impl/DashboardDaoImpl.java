package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.vyaguta.commons.Constant;
import com.lftechnology.vyaguta.resource.dao.DashboardDao;
import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class DashboardDaoImpl implements DashboardDao {

    @Inject
    private EntityManager em;

    @Override
    public List<Contract> list(String dates[]) {
        LocalDate pointOne = LocalDate.parse(dates[0], Constant.DATE_FORMAT_DB);
        LocalDate pointTwo = LocalDate.parse(dates[1], Constant.DATE_FORMAT_DB);
        List<Contract> contracts = em
                .createQuery(
                        "SELECT c from Contract c WHERE c.endDate BETWEEN :pointOne AND :pointTwo order by c.endDate desc",
                        Contract.class)
                .setParameter("pointOne", pointOne).setParameter("pointTwo", pointTwo).getResultList();
        return contracts;
    }
}
