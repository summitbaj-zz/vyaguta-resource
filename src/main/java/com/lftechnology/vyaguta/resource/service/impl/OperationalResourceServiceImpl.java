package com.lftechnology.vyaguta.resource.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.persistence.PersistenceException;
import javax.transaction.Transactional;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.exception.ObjectAlreadyExistsException;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.OperationalResourceDao;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.EmployeeService;
import com.lftechnology.vyaguta.resource.service.OperationalResourceService;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */
@Transactional
public class OperationalResourceServiceImpl implements OperationalResourceService {

    @Inject
    private OperationalResourceDao operationalResourceDao;

    @Inject
    private EmployeeService employeeService;

    @Override
    public OperationalResource save(OperationalResource operationalResource) {
        List<OperationalResource> operationalResources = operationalResourceDao.findAll();
        for (OperationalResource operationalResource2 : operationalResources) {
            if(operationalResource2.getEmployee().getId().equals(operationalResource.getEmployee().getId())){
                throw new ObjectAlreadyExistsException("Employee already exists");
            }
        }
        return this.operationalResourceDao.save(operationalResource);
    }

    @Override
    public OperationalResource update(OperationalResource operationalResource) {
        return this.operationalResourceDao.update(operationalResource);
    }

    @Override
    public OperationalResource merge(UUID id, OperationalResource operationalResource) {
        // TODO Change this method according to requirement
        return new OperationalResource();
    }

    @Override
    public void remove(OperationalResource operationalResource) {
        this.operationalResourceDao.remove(operationalResource);
    }

    @Override
    public void removeById(UUID id) {
        OperationalResource operationalResource = this.operationalResourceDao.findById(id);
        if (operationalResource == null) {
            throw new ObjectNotFoundException();
        }
        this.operationalResourceDao.remove(operationalResource);
    }

    @Override
    public OperationalResource findById(UUID id) {
        return this.operationalResourceDao.findById(id);
    }

    @Override
    public List<OperationalResource> findAll() {
        return this.operationalResourceDao.findAll();
    }

    @Override
    public Long count() {
        return this.operationalResourceDao.count(null);
    }

    @Override
    public List<OperationalResource> find(Integer start, Integer offset) {
        return this.operationalResourceDao.find(start, offset);
    }

    @SuppressWarnings("serial")
    @Override
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        List<OperationalResource> operationalResources = operationalResourceDao.findByFilter(queryParameters);
        if (operationalResources == null || operationalResources.isEmpty()) {
            return new HashMap<String, Object>() {
                {
                    put("count", 0);
                    put("data", new ArrayList<>());
                }
            };
        }
        List<UUID> operationalEmployeeIds = new ArrayList<UUID>();
        for (OperationalResource operationalResource : operationalResources) {
            operationalEmployeeIds.add(operationalResource.getEmployee().getId());
        }
        List<Employee> employees = this.employeeService.fetchEmployees(operationalEmployeeIds);
        operationalResources = addEmployeesToOperationalResourceFromEmployeeId(employees, operationalResources);

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("count", operationalResourceDao.count(queryParameters));
        result.put("data", operationalResources);
        return result;
    }

    protected List<OperationalResource> addEmployeesToOperationalResourceFromEmployeeId(List<Employee> employees,
            List<OperationalResource> operationalResources) {
        for (OperationalResource operationalResource : operationalResources) {
            for (Employee employee : employees) {
                if (employee.getId().equals(operationalResource.getEmployee().getId())) {
                    operationalResource.setEmployee(employee);
                    employees.remove(employee);
                    break;
                }
            }
        }
        return operationalResources;
    }

}
