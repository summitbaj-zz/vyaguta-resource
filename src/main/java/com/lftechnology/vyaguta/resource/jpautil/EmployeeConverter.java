package com.lftechnology.vyaguta.resource.jpautil;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Converter(autoApply = true)
public class EmployeeConverter implements AttributeConverter<Employee, String> {

    @Override
    public String convertToDatabaseColumn(Employee employee) {
        return employee == null ? null : employee.getId();
    }

    @Override
    public Employee convertToEntityAttribute(String str) {
        Employee employee = new Employee();
        employee.setId(str);
        return employee;
    }

}
