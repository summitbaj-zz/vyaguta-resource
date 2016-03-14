package com.lftechnology.vyaguta.resource.jpautil;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.resource.pojo.Employee;

public class EmployeeConverterTest {

    @InjectMocks
    private EmployeeConverter employeeConverter;

    String id = null;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        id = "1234567890abcdefghijkl";
    }

    @Test
    public void testConvertToDatabaseColumnWhenEmployeeIsNull() {
        // arrange
        Employee employee = null;

        // act
        String result = this.employeeConverter.convertToDatabaseColumn(employee);

        // assert
        assertEquals(null, result);
    }

    @Test
    public void testConvertToDatabaseColumnWhenEmployeeIsNotNull() {
        // arrange
        Employee employee = new Employee();
        employee.setId(id);

        // act
        String result = this.employeeConverter.convertToDatabaseColumn(employee);

        // assert
        assertThat(result, is(id));

    }

    @Test
    public void testConvertToEntityAttribute() {

        // act
        Employee employee = this.employeeConverter.convertToEntityAttribute(id);

        // assert
        assertThat(id, is(employee.getId()));
    }

}
