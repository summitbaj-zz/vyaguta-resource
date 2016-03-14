package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class ClientDaoImpl extends BaseDao<Client, String>implements ClientDao {

    public ClientDaoImpl() {
        super(Client.class);
    }

    /**
     * This method defines predicates for Criteria query on the basis of query
     * parameters.
     * 
     * @param MultiValued
     *            <String, String> queryParameters
     * @param CriteriaBuilder
     *            criteriaBuilder
     * @param Root
     *            <Entity> root
     * @return Predicate[]
     */
    @Override
    protected Predicate[] extractPredicates(MultivaluedMap<String, String> queryParameters,
            CriteriaBuilder criteriaBuilder, Root<Client> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (queryParameters.containsKey("name")) {
            String name = queryParameters.getFirst("name").toUpperCase();
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(root.get("name")), name);
            predicates.add(predicate);
        }
        if (queryParameters.containsKey("email")) {
            String email = queryParameters.getFirst("email").toUpperCase();
            Predicate predicate = criteriaBuilder.equal(criteriaBuilder.upper(root.get("email")), email);

            predicates.add(predicate);
        }
        return predicates.toArray(new Predicate[] {});
    }
}
