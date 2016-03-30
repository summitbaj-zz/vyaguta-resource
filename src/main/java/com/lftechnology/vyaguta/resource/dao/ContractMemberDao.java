package com.lftechnology.vyaguta.resource.dao;

import java.util.List;

import com.lftechnology.vyaguta.commons.dao.CrudDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
public interface ContractMemberDao extends CrudDao<ContractMember, String> {

    List<ContractMember> findByContract(Contract contract);

}
