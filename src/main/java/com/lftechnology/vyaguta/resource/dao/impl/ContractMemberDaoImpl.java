package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Stateless
public class ContractMemberDaoImpl extends BaseDao<ContractMember, UUID> implements ContractMemberDao {

    public ContractMemberDaoImpl() {
        super(ContractMember.class);
    }

    @Override
    public List<ContractMember> findByContract(Contract contract) {
        return em.createNamedQuery(ContractMember.FIND_BY_CONTRACT, ContractMember.class).setParameter("contract", contract)
                .getResultList();
    }

    @Override
    public Map<String, EntitySorter<ContractMember>> getSortOperations() {
        return new HashMap<>();
    }

    @Override
    public Map<String, EntityFilter<ContractMember>> getFilters() {
        return new HashMap<>();
    }

    @Override
    public List<Object[]> findBookedResource(LocalDate[] date) {
        Query query =
                em.createQuery("SELECT sum(CASE WHEN billed = 't' THEN (allocation * 0.01) ELSE 0 END) AS Billed, sum(CASE WHEN billed = 'f' THEN (allocation * 0.01) ELSE 0 END) AS Unbilled FROM ContractMember WHERE joinDate <= :joinDate AND endDate >= :endDate");
        query.setParameter("joinDate", date[0]);
        query.setParameter("endDate", date[1]);

        return query.getResultList();

    }

}
