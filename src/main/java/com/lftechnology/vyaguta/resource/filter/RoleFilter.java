package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.entity.Role;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
public class RoleFilter extends CommonFilter<Role>implements Filterable<Role> {

    public RoleFilter() {
        filterBy(CommonConstant.TITLE);
        searchByField("q", CommonConstant.TITLE);
    }
}
