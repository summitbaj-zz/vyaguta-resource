package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class BudgetTypeDaoImpl extends BaseDao<BudgetType, String>implements BudgetTypeDao {

    private CommonSort<BudgetType> budgetTypeSort = new CommonSort<>();
    private ExtractPredicateUtil<BudgetType> extractPredicateUtil = new ExtractPredicateUtil<>();

    public BudgetTypeDaoImpl() {
        super(BudgetType.class);
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<BudgetType> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, CommonConstant.TITLE));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, CommonConstant.TITLE));
        }

        return predicates.toArray(new Predicate[] {});
    }

    @Override
    public QuerySort<BudgetType> getQuerySort() {
        budgetTypeSort.sortByField("title");
        return budgetTypeSort;
    }
}
