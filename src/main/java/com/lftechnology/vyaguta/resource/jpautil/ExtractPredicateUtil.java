package com.lftechnology.vyaguta.resource.jpautil;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.impl.ProjectDaoImpl;
import com.lftechnology.vyaguta.resource.exception.ParameterFormatException;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ExtractPredicateUtil<T> {

    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public Predicate addSearchPredicate(QueryBuilder<T> qb, String field) {
        String value = qb.getFilters().getFirst("q");
        return qb.getCriteriaBuilder().like(qb.getRoot().get(field), "%" + value + "%");
    }

    public Predicate addFindPredicate(QueryBuilder<T> qb, String field) {
        String title = qb.getFilters().getFirst(CommonConstant.TITLE);
        return qb.getCriteriaBuilder().equal(qb.getRoot().get(field), title);
    }

    public Predicate addStartDatePredicate(QueryBuilder<T> qb, String rawDate) {
        try {
            if (rawDate.startsWith("gte")) {
                LocalDate startDate = LocalDate.parse(rawDate.replace("gte", ""), format);
                return qb.getCriteriaBuilder().greaterThanOrEqualTo(qb.getRoot().get(ProjectDaoImpl.START_DATE),
                        startDate);
            } else if (rawDate.startsWith("gt")) {
                LocalDate startDate = LocalDate.parse(rawDate.replace("gt", ""), format);
                return qb.getCriteriaBuilder().greaterThan(qb.getRoot().get(ProjectDaoImpl.START_DATE), startDate);
            }
            return null;
        } catch (DateTimeParseException e) {
            throw new ParameterFormatException("Start date format is invalid, should be in yyyy-MM-dd format");
        }
    }

    public Predicate addEndDatePredicate(QueryBuilder<T> qb, String rawDate) {
        try {
            if (rawDate.startsWith("lte")) {
                LocalDate endDate = LocalDate.parse(rawDate.replace("lte", ""), format);
                return qb.getCriteriaBuilder().lessThanOrEqualTo(qb.getRoot().get(ProjectDaoImpl.END_DATE), endDate);
            } else if (rawDate.startsWith("lt")) {
                LocalDate endDate = LocalDate.parse(rawDate.replace("lt", ""), format);
                return qb.getCriteriaBuilder().lessThan(qb.getRoot().get(ProjectDaoImpl.END_DATE), endDate);
            }
            return null;
        } catch (DateTimeParseException e) {
            throw new ParameterFormatException("End date format is invalid, should be in yyyy-MM-dd format");
        }
    }
}
