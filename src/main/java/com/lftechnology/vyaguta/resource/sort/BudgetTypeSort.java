package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class BudgetTypeSort extends CommonSort<BudgetType> {

    public BudgetTypeSort() {
        sortByField("title");
    }
}
