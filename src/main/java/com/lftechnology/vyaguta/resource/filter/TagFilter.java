package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class TagFilter extends CommonFilter<Tag>implements Filterable<Tag> {

    public TagFilter() {
        filterByField("title");
        searchByField("title");
    }

}
