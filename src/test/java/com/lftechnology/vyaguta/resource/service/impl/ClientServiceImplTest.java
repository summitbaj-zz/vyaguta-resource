package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.dao.ClientDao;
import com.lftechnology.vyaguta.resource.entity.Client;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@RunWith(MockitoJUnitRunner.class)
public class ClientServiceImplTest {

    private static final String ID = "542aecf1e87a4e018d67e58e4d30298f";
    private static final Long COUNT = 20L;

    @Mock
    private ClientDao clientDao;

    @InjectMocks
    @Spy
    private ClientServiceImpl clientService;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveClient() {
        // arrange
        Client client = this.buildClient();
        Mockito.when(this.clientDao.save(client)).thenReturn(client);

        // act
        Client resultClient = this.clientService.save(client);

        // assert
        Mockito.verify(clientDao).save(client);
        assertThat(resultClient, is(client));
    }

    @Test
    public void testUpdateClient() {
        // arrange
        Client client = new Client();
        Mockito.when(this.clientDao.update(Matchers.any(Client.class)))
                .thenReturn(client);

        // act
        this.clientService.update(client);

        // assert
        Mockito.verify(clientDao).update(client);

    }

    @Test
    public void testMergeClient() {
        // arrange
        Client client = this.buildClient();
        Mockito.when(this.clientDao.findById(Matchers.anyString())).thenReturn(
                client);
        Mockito.when(this.clientService.findById(Matchers.anyString()))
                .thenReturn(client);

        // act
        this.clientService.merge(ID, client);

        // assert
        Mockito.verify(clientDao).update(client);
    }

    @Test
    public void testMergeWhenObjectNotFoundException() {

        // arrange
        Client client = new Client();
        Mockito.when(this.clientDao.findById(Matchers.anyString())).thenReturn(
                null);
        exception.expect(ObjectNotFoundException.class);

        // act
        this.clientService.merge(ID, client);

    }

    @Test
    public void testRemoveClient() {
        // arrange
        Client client = this.buildClient();
        Mockito.doNothing().when(this.clientDao).remove(client);

        // act
        this.clientService.remove(client);

        // assert
        Mockito.verify(clientDao).remove(client);
    }

    @Test
    public void testRemoveClientById() {
        // arrange
        Client client = this.buildClient();
        Mockito.when(this.clientDao.findById(Matchers.anyString())).thenReturn(
                client);
        Mockito.when(this.clientService.findById(Matchers.anyString()))
                .thenReturn(client);

        // act
        this.clientService.removeById(ID);

        // assert
        Mockito.verify(clientService).remove(client);

    }

    @Test
    public void testRemoveClientByIdWhenObjectNotFoundException() {
        // arrange
        Mockito.when(this.clientService.findById(Matchers.anyString()))
                .thenReturn(null);
        exception.expect(ObjectNotFoundException.class);
        // act
        this.clientService.removeById(ID);

    }

    @Test
    public void findClientById() {
        // arrange
        Mockito.when(this.clientDao.findById(Matchers.anyString())).thenReturn(
                new Client());

        // act
        this.clientService.findById(ID);

        // assert
        Mockito.verify(clientDao).findById(Matchers.anyString());

    }

    @Test
    public void testFindAllClient() {
        // arrange
        Mockito.when(this.clientDao.findAll()).thenReturn(
                new ArrayList<Client>());

        // act
        this.clientService.findAll();

        // assert
        Mockito.verify(clientDao).findAll();
    }

    @Test
    public void testCountClient() {
        // arrange
        Mockito.when(this.clientDao.count()).thenReturn(COUNT);

        // act
        Long result = this.clientService.count();

        // assert
        Mockito.verify(clientDao).count();
        assertEquals(Long.valueOf("20"), result);
    }

    @Test
    public void testFindClient() {
        // arrange
        Mockito.when(this.clientDao.find(Matchers.anyInt(), Matchers.anyInt()))
                .thenReturn(new ArrayList<Client>());

        // act
        this.clientService.find(Matchers.anyInt(), Matchers.anyInt());

        // assert
        Mockito.verify(clientDao).find(Matchers.anyInt(), Matchers.anyInt());
    }

    private Client buildClient() {
        Client client = new Client();
        User user = this.buildUser();
        client.setId(ID);
        client.setName("Krishna Timilsina");
        client.setEmail("krishnatimilsina2@lftechnology.com");
        client.setPhoneNo("42342342342");
        client.setCreatedBy(user);
        client.setUpdatedAt(LocalDateTime.now());
        client.setCreatedAt(LocalDateTime.now());
        return client;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("krishnatimilsina@lftechnology.com");
        user.setId(ID);
        user.setName("Krishna Timilsina");
        return user;
    }
}
