package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
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
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.BudgetTypeDao;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@RunWith(MockitoJUnitRunner.class)
public class BudgetTypeServiceImplTest {

    private static final String ID = "86e14841918a43abad9dd96d4d41acf4";
    private static final Long COUNT = 20L;

    @Mock
    private BudgetTypeDao budgetTypeDao;

    @InjectMocks
    @Spy
    private BudgetTypeServiceImpl budgetTypeService;

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(this.budgetTypeDao.save(budgetType)).thenReturn(budgetType);

        // act
        BudgetType resultBudgetType = this.budgetTypeService.save(budgetType);

        // assert
        Mockito.verify(budgetTypeDao).save(budgetType);
        assertThat(resultBudgetType, is(budgetType));
    }

    @Test
    public void testUpdateBudgetType() {
        // arrange
        BudgetType budgetType = new BudgetType();
        Mockito.when(this.budgetTypeDao.update(Matchers.any(BudgetType.class))).thenReturn(budgetType);

        // act
        this.budgetTypeService.update(budgetType);

        // assert
        Mockito.verify(budgetTypeDao).update(budgetType);

    }

    @Test
    public void testMergeBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(this.budgetTypeDao.findById(Matchers.anyString())).thenReturn(budgetType);
        Mockito.when(this.budgetTypeService.findById(Matchers.anyString())).thenReturn(budgetType);

        // act
        this.budgetTypeService.merge(ID, budgetType);

        // assert
        Mockito.verify(budgetTypeDao).update(budgetType);
    }

    @Test(expected = ObjectNotFoundException.class)
    public void testMergeWhenObjectNotFoundException() {
        // arrange
        BudgetType budgetType = new BudgetType();
        Mockito.when(this.budgetTypeDao.findById(Matchers.anyString())).thenReturn(null);

        // act
        this.budgetTypeService.merge(ID, budgetType);

        // assert
        Mockito.verify(budgetTypeDao).update(budgetType);

    }

    @Test
    public void testRemoveBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.doNothing().when(this.budgetTypeDao).remove(budgetType);

        // act
        this.budgetTypeService.remove(budgetType);

        // assert
        Mockito.verify(budgetTypeDao).remove(budgetType);
    }

    @Test
    public void testRemoveBudgetTypeById() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(this.budgetTypeDao.findById(Matchers.anyString())).thenReturn(budgetType);
        Mockito.when(this.budgetTypeService.findById(Matchers.anyString())).thenReturn(budgetType);

        // act
        this.budgetTypeService.removeById(ID);

        // assert
        Mockito.verify(budgetTypeService).remove(budgetType);

    }

    @Test(expected = ObjectNotFoundException.class)
    public void testRemoveBudgetTypeByIdWhenObjectNotFoundException() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(this.budgetTypeService.findById(Matchers.anyString())).thenReturn(null);

        // act
        this.budgetTypeService.removeById(ID);

        // assert
        Mockito.verify(budgetTypeService).remove(budgetType);
    }

    @Test
    public void findBudgetTypeById() {
        // arrange
        Mockito.when(this.budgetTypeDao.findById(Matchers.anyString())).thenReturn(new BudgetType());

        // act
        this.budgetTypeService.findById(ID);

        // assert
        Mockito.verify(budgetTypeDao).findById(Matchers.anyString());

    }

    @Test
    public void testFindAllBudgetType() {
        // arrange
        Mockito.when(this.budgetTypeDao.findAll()).thenReturn(new ArrayList<BudgetType>());

        // act
        this.budgetTypeService.findAll();

        // assert
        Mockito.verify(budgetTypeDao).findAll();
    }

    @Test
    public void testCountBudgetType() {
        // arrange
        Mockito.when(this.budgetTypeDao.count(null)).thenReturn(COUNT);

        // act
        Long result = this.budgetTypeService.count();

        // assert
        Mockito.verify(budgetTypeDao).count(null);
        assertEquals(Long.valueOf("20"), result);
    }

    @Test
    public void testFindBudgetType() {
        // arrange
        Mockito.when(this.budgetTypeDao.find(Matchers.anyInt(), Matchers.anyInt()))
                .thenReturn(new ArrayList<BudgetType>());

        // act
        this.budgetTypeService.find(Matchers.anyInt(), Matchers.anyInt());

        // assert
        Mockito.verify(budgetTypeDao).find(Matchers.anyInt(), Matchers.anyInt());
    }

    @Test
    public void testFindByFilter() {

        // arrange
        Map<String, List<String>> multiValue = new HashMap<>();
        multiValue.put("title", Arrays.asList("Resource Based"));
        MultivaluedMap<String, String> queryParameters = new MultivaluedMapImpl<>(multiValue);
        List<BudgetType> budgetTypes = new ArrayList<>();
        budgetTypes.add(this.buildBudgetType());

        Mockito.when(budgetTypeDao.findByFilter(queryParameters)).thenReturn(budgetTypes);
        Mockito.when(budgetTypeDao.count(queryParameters)).thenReturn(10L);

        // act
        Map<String, Object> result = this.budgetTypeService.findByFilter(queryParameters);

        // assert
        assertTrue(result.containsKey("count"));
        assertTrue(result.containsValue(10L));
        assertTrue(result.containsKey("data"));
        assertTrue(result.containsValue(budgetTypes));
        Mockito.verify(budgetTypeDao).count(queryParameters);
        Mockito.verify(budgetTypeDao).findByFilter(queryParameters);
    }

    private BudgetType buildBudgetType() {
        BudgetType budgetType = new BudgetType();
        User user = this.buildUser();
        budgetType.setId(ID);
        budgetType.setTitle("Fixed Budget");
        budgetType.setCreatedBy(user);
        budgetType.setUpdatedAt(LocalDateTime.now());
        budgetType.setCreatedAt(LocalDateTime.now());
        return budgetType;
    }

    private User buildUser() {
        User user = new User();
        user.setEmail("krishnatimilsina@lftechnology.com");
        user.setId(ID);
        user.setName("Krishna Timilsina");
        return user;
    }
}
