package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.criteria.Order;

import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.commons.jpautil.QuerySorter;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class CommonSort<T> implements QuerySort<T> {

    private Map<String, QuerySorter<T>> sortMap = new HashMap<>();

    @Override
    public Map<String, QuerySorter<T>> getSortMap() {
        return sortMap;
    }

    public void sortByField(String field) {
        sortMap.put(field, new QuerySorter<T>() {

            @Override
            public Order sort(QueryBuilder<T> qb, String sortField, boolean ascending) {
                if (ascending) {
                    return qb.getCriteriaBuilder().asc(qb.getRoot().get(sortField));
                } else {
                    return qb.getCriteriaBuilder().desc(qb.getRoot().get(sortField));
                }
            }
        });

    }

}
