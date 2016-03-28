package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class BudgetTypeFilter extends CommonFilter<BudgetType>implements Filterable<BudgetType> {

    public BudgetTypeFilter() {
        findByField(CommonConstant.TITLE);
        searchByField("q", CommonConstant.TITLE);
    }
}
