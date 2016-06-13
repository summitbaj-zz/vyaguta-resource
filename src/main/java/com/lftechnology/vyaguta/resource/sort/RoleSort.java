package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.Role;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
public class RoleSort extends CommonSort<Role> {

    public RoleSort() {
        sortBy("title");
    }
}
