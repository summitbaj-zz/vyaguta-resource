package com.lftechnology.vyaguta.resource.service;

import java.util.List;

import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface ContractMemberService {

    /**
     * Returns list of {@link Project} where {@link Employee} has worked.
     * 
     * @param {@link Employee}
     * @return (@link List<{@link Project}>}
     */
    List<Project> findByEmployee(Employee employee, MultivaluedMap<String, String> queryParameter);

}
