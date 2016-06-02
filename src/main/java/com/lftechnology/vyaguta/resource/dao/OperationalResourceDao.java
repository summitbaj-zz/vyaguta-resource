package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */

public interface OperationalResourceDao extends CrudDao<OperationalResource, UUID>{

    Map<String, Object> findBilledAndUnbilledResource(LocalDate date);

}
