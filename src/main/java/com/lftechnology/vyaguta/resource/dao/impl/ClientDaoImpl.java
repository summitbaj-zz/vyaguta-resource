package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.Map;

import javax.ejb.Stateless;

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
@Stateless
public class ClientDaoImpl extends BaseDao<Client, String>implements ClientDao {

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
