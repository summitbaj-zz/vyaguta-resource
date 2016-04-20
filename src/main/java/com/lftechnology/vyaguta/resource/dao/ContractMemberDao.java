package com.lftechnology.vyaguta.resource.dao;

import java.time.LocalDate;
import java.util.List;
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

    List<Object[]> findBookedResource(LocalDate[] date);

    Long getBookedResourceCount(LocalDate[] date);

}
