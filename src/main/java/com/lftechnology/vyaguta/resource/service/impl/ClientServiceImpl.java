package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MultivaluedMap;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.service.ClientService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class ClientServiceImpl implements ClientService {

    @Inject
    ClientDao clientDao;

    @Override
    public Client save(Client client) {
        return clientDao.save(client);
    }

    @Override
    public Client update(Client client) {
        return clientDao.update(client);
    }

    @Override
    public Client merge(String id, Client obj) {
        Client client = this.findById(id);
        if (client == null) {
            throw new ObjectNotFoundException();
        }
        client.setName(obj.getName());
        client.setEmail(obj.getEmail());
        client.setPhoneNo(obj.getPhoneNo());
        client.setSkype(obj.getSkype());
        client.setAddress(obj.getAddress());
        client.setDescription(obj.getDescription());
        return this.update(client);
    }

    @Override
    public void remove(Client client) {
        clientDao.remove(client);
    }

    @Override
    public void removeById(String id) {
        Client client = this.findById(id);
        if (client == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(client);
    }

    @Override
    public Client findById(String id) {
        return clientDao.findById(id);
    }

    @Override
    public List<Client> findAll() {
        return clientDao.findAll();
    }

    @Override
    public Long count() {
        return clientDao.count();
    }

    @Override
    public List<Client> find(Integer start, Integer offset) {
        return clientDao.find(start, offset);
    }

    @Override
    public List<Client> findByFilter(
            MultivaluedMap<String, String> queryParameters) {
        return clientDao.findByFilter(queryParameters);
    }
}
