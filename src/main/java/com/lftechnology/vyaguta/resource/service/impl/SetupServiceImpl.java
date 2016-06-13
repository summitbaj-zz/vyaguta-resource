package com.lftechnology.vyaguta.resource.service.impl;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.resource.dao.SetupDao;
import com.lftechnology.vyaguta.resource.entity.Role;
import com.lftechnology.vyaguta.resource.service.SetupService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Stateless
public class SetupServiceImpl implements SetupService {

    @Inject
    private SetupDao setupDao;

    @Override
    public Role getDefaultRole() {
        return setupDao.getDefaultRole();
    }

}
