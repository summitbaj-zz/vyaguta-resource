package com.lftechnology.vyaguta.resource.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.DashboardDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.service.DashBoardService;

@Stateless
public class DashboardServiceImpl implements DashBoardService {

    @Inject
    private DashboardDao dashboardDao;

    @Override
    public List<Project> list(MultivaluedMap<String, String> queryParameter) {
        if (queryParameter.containsKey("contract.endDate")) {
            String parameter = queryParameter.getFirst("contract.endDate").replaceFirst("btn", "");
            List<Contract> contracts = dashboardDao.list(parameter.split("and"));
            return contracts.stream().map(p -> p.getProject()).distinct().collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

}
