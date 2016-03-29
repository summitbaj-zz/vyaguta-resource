package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.Client;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ClientSort extends CommonSort<Client> {

    public ClientSort() {
        sortByField("name");
    }

}
