package com.lftechnology.vyaguta.resource.service.impl;

import java.util.List;

import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.ContractMemberService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ContractMemberServiceImpl implements ContractMemberService {

    @Inject
    private ContractMemberDao contractMemberDao;

    @Override
    public List<Project> findByEmployee(Employee employee, MultivaluedMap<String, String> queryParameter) {
        return contractMemberDao.findByEmployee(employee, queryParameter);
    }
}
