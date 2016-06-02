package com.lftechnology.vyaguta.resource.dao.impl;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.Query;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.OperationalResourceDao;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;

public class OperationalResourceDaoImpl extends BaseDao<OperationalResource, UUID> implements OperationalResourceDao{

    public OperationalResourceDaoImpl() {
        super(OperationalResource.class);
    }

    @Override
    public Map<String, EntitySorter<OperationalResource>> getSortOperations() {
        return new HashMap<String, EntitySorter<OperationalResource>>();
    }

    @Override
    public Map<String, EntityFilter<OperationalResource>> getFilters() {
        return new HashMap<String, EntityFilter<OperationalResource>>();
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> findBilledAndUnbilledResource(LocalDate date) {
        Map<String, Object> map = new HashMap<>();
        Query query =
                em.createNativeQuery("SELECT SUM(CASE WHEN cm.billed = 't' THEN (cm.allocation * 0.01) ELSE 0 END) AS Billed, SUM(CASE WHEN cm.billed = 'f' THEN (cm.allocation * 0.01) ELSE 0 END) AS Unbilled FROM contract_members cm JOIN operational_resources ors ON cm.employee_id = ors.employee_id WHERE :date BETWEEN join_date AND end_date");
        query.setParameter("date", Date.valueOf(date));
        List<Object[]> result = query.getResultList();
        for (Object[] obj : result) {
            map.put("billed", obj[0] == null ? 0.0 : obj[0]);
            map.put("unbilled", obj[1] == null ? 0.0 : obj[1]);
        }
        return map;
    }
}
