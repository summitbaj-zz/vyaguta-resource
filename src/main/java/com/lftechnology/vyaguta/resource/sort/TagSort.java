package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class TagSort extends CommonSort<Tag> {

    public TagSort() {
        sortByField("title");
    }

}
