package com.lftechnology.vyaguta.resource.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.service.ClientService;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Stateless
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
    public Client merge(UUID id, Client obj) {
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
    public void removeById(UUID id) {
        Client client = this.findById(id);
        if (client == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(client);
    }

    @Override
    public Client findById(UUID id) {
        return clientDao.findById(id);
    }

    @Override
    public List<Client> findAll() {
        return clientDao.findAll();
    }

    @Override
    public Long count() {
        return clientDao.count(null);
    }

    @Override
    public List<Client> find(Integer start, Integer offset) {
        return clientDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        return new HashMap<String, Object>() {
            {
                put("count", clientDao.count(queryParameters));
                put("data", clientDao.findByFilter(queryParameters));
            }
        };
    }
}
