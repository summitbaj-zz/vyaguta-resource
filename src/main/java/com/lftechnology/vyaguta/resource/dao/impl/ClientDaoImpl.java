package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.filter.ClientFilter;
import com.lftechnology.vyaguta.resource.sort.ClientSort;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class ClientDaoImpl extends BaseDao<Client, UUID> implements ClientDao {

    private ClientSort clientSort = new ClientSort();
    private ClientFilter clientFilter = new ClientFilter();

    public ClientDaoImpl() {
        super(Client.class);
    }

    @Override
    public Map<String, EntitySorter<Client>> getSortOperations() {
        return clientSort.getSortOperations();
    }

    @Override
    public Map<String, EntityFilter<Client>> getFilters() {
        return clientFilter.getFilters();
    }

}
