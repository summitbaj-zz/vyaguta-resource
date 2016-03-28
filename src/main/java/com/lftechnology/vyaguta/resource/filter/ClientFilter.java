package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.entity.Client;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ClientFilter extends CommonFilter<Client>implements Filterable<Client> {

    public ClientFilter() {
        filterByField("name");
        searchByField("name");
    }

}
