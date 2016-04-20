package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.persistence.Query;

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

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> findBilledAndUnbilledResource(LocalDate date) {
        Map<String, Object> map = new HashMap<>();

        Query query = em.createQuery(
                "SELECT SUM(CASE WHEN billed = 't' THEN (allocation * 0.01) ELSE 0 END) AS Billed, SUM(CASE WHEN billed = 'f' THEN (allocation * 0.01) ELSE 0 END) AS Unbilled FROM ContractMember WHERE :date BETWEEN joinDate AND endDate");
        query.setParameter("date", date);
        List<Object[]> result = query.getResultList();
        for (Object[] obj : result) {
            map.put("billed", obj[0] == null ? 0 : obj[0]);
            map.put("unbilled", obj[1] == null ? 0 : obj[1]);
        }

        return map;
    }

    @Override
    public Long findBookedResourceCount(LocalDate date) {
        return em.createNamedQuery(ContractMember.COUNT_DISTINCT_MEMBERS, Long.class).setParameter("date", date).getSingleResult();
    }

}
