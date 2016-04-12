package com.lftechnology.vyaguta.resource.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.dao.ProjectRoleDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Stateless
public class ContractMemberDaoImpl extends BaseDao<ContractMember, UUID> implements ContractMemberDao {

    @Inject
    private ProjectRoleDao projectRoleDao;
    
    public ContractMemberDaoImpl() {
        super(ContractMember.class);
    }

    @Override
    public List<ContractMember> findByContract(Contract contract) {
        return em.createNamedQuery(ContractMember.FIND_BY_CONTRACT, ContractMember.class)
                .setParameter("contract", contract).getResultList();
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
    public void deleteRole(UUID id) {
        ProjectRole role = this.projectRoleDao.findById(id);
        List<ContractMember> contractMembers =
                em.createNamedQuery(ContractMember.FIND_BY_PROJECT_ROLE, ContractMember.class).setParameter("role", role).getResultList();
        for (ContractMember cm : contractMembers) {
            cm.setRole(null);
            this.update(cm);
        }
        
    }

}
