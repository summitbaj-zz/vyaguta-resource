package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import com.lftechnology.vyaguta.resource.entity.Contract;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@FunctionalInterface
public interface DashboardDao {

    public List<Contract> list(String[] dates);
}
