package com.lftechnology.vyaguta.resource.dao.impl;

import javax.ejb.Stateless;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;


/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
public class ClientDaoImpl extends BaseDao<Client, String>implements ClientDao {

    public ClientDaoImpl() {
        super(Client.class);
    }
}
