package com.lftechnology.vyaguta.resource.dao.impl;

import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

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
import org.mockito.runners.MockitoJUnitRunner;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.jpautil.CriteriaUtil;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@RunWith(MockitoJUnitRunner.class)
public class BudgetTypeDaoImplTest {

    private static final String ID = "86e14841918a43abad9dd96d4d41acf4";
    @Mock
    private EntityManager em;

    @Mock
    private CriteriaUtil<BudgetType> criteriaUtil;

    @InjectMocks
    private BudgetTypeDaoImpl budgetTypeDao;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.doNothing().when(em).persist(budgetType);
        Mockito.doNothing().when(em).flush();

        // act
        this.budgetTypeDao.save(budgetType);

        // assert
        Mockito.verify(em, Mockito.times(1)).persist(budgetType);
        Mockito.verify(em, Mockito.times(1)).flush();
    }

    @Test(expected = DataAccessException.class)
    public void testSaveBudgetTypeAndExpectDataAccessExceptionWhenEntityManagerFails() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.doThrow(new PersistenceException("Exception while persisting budget type")).when(em).persist(budgetType);

        // act
        this.budgetTypeDao.save(budgetType);

        // assert
        Mockito.verify(budgetTypeDao, Mockito.times(1)).save(budgetType);
    }

    @Test
    public void testUpdateBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(em.merge(budgetType)).thenReturn(budgetType);
        Mockito.doNothing().when(em).flush();

        // act
        this.budgetTypeDao.update(budgetType);

        // assert
        Mockito.verify(em, Mockito.times(1)).merge(budgetType);
        Mockito.verify(em, Mockito.times(1)).flush();
    }

    @Test(expected = DataAccessException.class)
    public void testUpdateBudgetTypeAndExpectDataAccessExceptionWhenEntityManagerFails() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.doThrow(new PersistenceException("Exception while persisting budget type")).when(em).merge(budgetType);

        // act
        this.budgetTypeDao.update(budgetType);

        // assert
        Mockito.verify(budgetTypeDao, Mockito.times(1)).update(budgetType);
    }

    @Test
    public void testRemoveBudgetType() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(em.merge(budgetType)).thenReturn(budgetType);
        Mockito.doNothing().when(em).remove(budgetType);

        // act
        this.budgetTypeDao.remove(budgetType);

        // assert
        Mockito.verify(em, Mockito.times(1)).merge(budgetType);
        Mockito.verify(em, Mockito.times(1)).remove(budgetType);
    }

    @Test(expected = DataAccessException.class)
    public void testRemoveBudgetTypeAndExpectDataAccessExceptionWhenEntityManagerFails() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.doThrow(new PersistenceException("Exception while persisting budget type")).when(em).merge(budgetType);

        // act
        this.budgetTypeDao.remove(budgetType);

        // assert
        Mockito.verify(em, Mockito.times(0)).remove(budgetType);
    }

    @Test
    public void testFindBudgetTypeById() {
        // arrange
        BudgetType budgetType = this.buildBudgetType();
        Mockito.when(em.find(Matchers.anyObject(), Matchers.anyString())).thenReturn(budgetType);

        // act
        this.budgetTypeDao.findById(ID);

        // assert
        Mockito.verify(em, Mockito.times(1)).find(Matchers.anyObject(), Matchers.anyString());
    }

    @Test
    public void testFindAllBudgetType() {
        // arrange
        List<BudgetType> budgetTypes = new ArrayList<BudgetType>();
        budgetTypes.add(new BudgetType());
        budgetTypes.add(new BudgetType());
        Mockito.when(this.criteriaUtil.findAll(BudgetType.class)).thenReturn(budgetTypes);

        // act
        List<BudgetType> resultBudgetTypes = this.budgetTypeDao.findAll();

        // assert
        Mockito.verify(this.criteriaUtil, Mockito.times(1)).findAll(BudgetType.class);
        assertEquals(2, resultBudgetTypes.size());
    }

    @Test
    public void testCountBudgetType() {
        // arrange
        Mockito.when(this.criteriaUtil.count(BudgetType.class)).thenReturn(100L);

        // act
        Long result = this.budgetTypeDao.count();

        // assert
        Mockito.verify(this.criteriaUtil, Mockito.times(1)).count(BudgetType.class);
        assertEquals(Long.valueOf(100l), Long.valueOf(result));
    }

    @Test
    public void testFindBudgetType() {
        // arrange
        List<BudgetType> budgetTypes = new ArrayList<BudgetType>();
        budgetTypes.add(new BudgetType());
        budgetTypes.add(new BudgetType());
        Mockito.when(this.criteriaUtil.find(BudgetType.class, 1, 20)).thenReturn(budgetTypes);

        // act
        List<BudgetType> result = this.budgetTypeDao.find(1, 20);

        // assert
        Mockito.verify(this.criteriaUtil, Mockito.times(1)).find(BudgetType.class, 1, 20);
        assertEquals(2, result.size());
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
