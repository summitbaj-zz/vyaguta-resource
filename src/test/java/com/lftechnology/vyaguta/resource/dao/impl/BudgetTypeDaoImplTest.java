package com.lftechnology.vyaguta.resource.dao.impl;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import com.lftechnology.vyaguta.resource.entity.BudgetType;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@RunWith(MockitoJUnitRunner.class)
public class BudgetTypeDaoImplTest {

    @Mock
    public Root<BudgetType> root;

    @Mock
    public CriteriaBuilder criteriaBuilder;

    @Mock
    Path<String> path;

    @InjectMocks
    private BudgetTypeDaoImpl budgetTypeDao;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

}
