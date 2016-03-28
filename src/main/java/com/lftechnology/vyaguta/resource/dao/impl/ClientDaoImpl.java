package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class ClientDaoImpl extends BaseDao<Client, String>implements ClientDao {

    private CommonSort<Client> clientSort = new CommonSort<>();
    private ExtractPredicateUtil<Client> extractPredicateUtil = new ExtractPredicateUtil<>();

    public ClientDaoImpl() {
        super(Client.class);
    }

    @Override
    public QuerySort<Client> getQuerySort() {
        clientSort.sortByField("name");
        return clientSort;
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<Client> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, "name"));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, "name"));
        }

        return predicates.toArray(new Predicate[] {});
    }

}
