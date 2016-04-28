package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.pojo.Employee;

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
     * @return map with keys: "billed" and "unbilled"
     */
    Map<String, Object> findBilledAndUnbilledResource(LocalDate date);

    /**
     * @param LocalDate
     *            date
     * @return Long
     */
    Long findBookedResourceCount(LocalDate date);

    Map<UUID, Double> findAvailableResource(LocalDate date);
    
    List<Double> findTotalAllocation(Employee employee, LocalDate joinDate, LocalDate endDate);

}
