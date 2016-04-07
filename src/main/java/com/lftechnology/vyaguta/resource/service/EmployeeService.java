package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.UUID;

import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public interface EmployeeService {

    public List<Employee> fetchEmployees(List<UUID> employeeIds);
}
