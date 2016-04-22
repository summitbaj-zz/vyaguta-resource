package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
public interface ContractMemberDao extends CrudDao<ContractMember, UUID> {

    List<ContractMember> findByContract(Contract contract);

    /**
     * 
     * @param date
     * @return map with keys: "billed", "unbilled", "totalResources",
     *         "freeResources" and "bookedResources"
     */
    Map<String, Object> findBilledAndUnbilledResource(LocalDate date);

    Long findBookedResourceCount(LocalDate date);

    Map<UUID, Double> findAvailableResource(LocalDate date);

}
