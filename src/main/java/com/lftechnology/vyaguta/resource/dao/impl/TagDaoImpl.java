package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.Predicate;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.QueryBuilder;
import com.lftechnology.vyaguta.commons.jpautil.QuerySort;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.jpautil.ExtractPredicateUtil;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class TagDaoImpl extends BaseDao<Tag, String>implements TagDao {

    private CommonSort<Tag> tagSort = new CommonSort<>();
    private ExtractPredicateUtil<Tag> extractPredicateUtil = new ExtractPredicateUtil<>();

    public TagDaoImpl() {
        super(Tag.class);
    }

    @Override
    public QuerySort<Tag> getQuerySort() {
        tagSort.sortByField("title");
        return tagSort;
    }

    @Override
    protected Predicate[] extractPredicates(QueryBuilder<Tag> qb) {
        List<Predicate> predicates = new ArrayList<>();

        if (qb.getFilters().containsKey("q")) {
            predicates.add(extractPredicateUtil.addSearchPredicate(qb, CommonConstant.TITLE));
        }

        if (qb.getFilters().containsKey(CommonConstant.TITLE)) {
            predicates.add(extractPredicateUtil.addFindPredicate(qb, CommonConstant.TITLE));
        }

        return predicates.toArray(new Predicate[] {});
    }
}
