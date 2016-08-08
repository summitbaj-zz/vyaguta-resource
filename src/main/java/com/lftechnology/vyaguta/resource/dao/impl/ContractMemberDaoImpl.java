package com.lftechnology.vyaguta.resource.dao.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.lftechnology.vyaguta.commons.Constant;
import com.lftechnology.vyaguta.commons.dao.BaseDao;
import com.lftechnology.vyaguta.commons.jpautil.EntityFilter;
import com.lftechnology.vyaguta.commons.jpautil.EntitySorter;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
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

        Query query = em
                .createQuery("SELECT SUM(CASE WHEN billed = 't' THEN (allocation * 0.01) ELSE 0 END) AS Billed, SUM(CASE WHEN billed = 'f' THEN (allocation * 0.01) ELSE 0 END) AS Unbilled FROM ContractMember WHERE :date BETWEEN joinDate AND endDate");
        query.setParameter("date", date);
        List<Object[]> result = query.getResultList();
        for (Object[] obj : result) {
            map.put("billed", obj[0] == null ? 0.0 : obj[0]);
            map.put("unbilled", obj[1] == null ? 0.0 : obj[1]);
        }

        return map;
    }

    @Override
    public Long findBookedResourceCount(LocalDate date) {
        return em.createNamedQuery(ContractMember.COUNT_DISTINCT_MEMBERS, Long.class).setParameter("date", date).getSingleResult();
    }

    @SuppressWarnings("unchecked")
    @Override
    public Map<UUID, Double> findAvailableResource(LocalDate date) {
        Map<UUID, Double> map = new HashMap<>();

        List<Object[]> result = em
                .createQuery(
                        "SELECT employee.id,  SUM(allocation * 0.01) FROM ContractMember WHERE :date BETWEEN joinDate AND endDate GROUP BY employee.id")
                .setParameter("date", date).getResultList();
        for (Object[] obj : result) {
            map.put((UUID) obj[0], (Double) obj[1]);
        }
        return map;
    }

    @Override
    public Double findProjectAllocation(Employee employee, LocalDate joinDate, LocalDate endDate) {
        try {

            return em.createNamedQuery(ContractMember.FIND_PROJECT_ALLOCATION_SUM, Double.class).setParameter("employee", employee.getId())
                    .setParameter("jDate", joinDate).setParameter("eDate", endDate).getSingleResult();
        } catch (NoResultException e) {
            return 0d;
        }
    }

    @Override
    public Double findProjectAllocation(Employee employee, Project project, LocalDate joinDate, LocalDate endDate) {
        try {

            return em.createNamedQuery(ContractMember.FIND_PROJECT_ALLOCATION_SUM_EXCEPT_SELF, Double.class)
                    .setParameter("employee", employee.getId()).setParameter("project", project).setParameter("jDate", joinDate)
                    .setParameter("eDate", endDate).getSingleResult();
        } catch (NoResultException e) {
            return 0d;
        }
    }

    /*
     * Method that returns list of project in which employee is involved.
     */
    @Override
    public List<Project> findByEmployee(Employee employee, MultivaluedMap<String, String> queryParameter) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Project> criteriaQuery = criteriaBuilder.createQuery(Project.class);
        Root<Project> project = criteriaQuery.from(Project.class);
        Join<Project, Contract> projectJoinContract = project.join("contracts");
        Join<Contract, ContractMember> projectJoinContractJoinContractMember = projectJoinContract.join("contractMembers");

        criteriaQuery.select(criteriaQuery.getSelection()).where(
                extractPredicates(employee, queryParameter, criteriaBuilder, projectJoinContractJoinContractMember));

        TypedQuery<Project> query = em.createQuery(criteriaQuery);
        return query.getResultList();
    }

    private Predicate[] extractPredicates(Employee employee, MultivaluedMap<String, String> queryParameter,
            CriteriaBuilder criteriaBuilder, Join<Contract, ContractMember> root) {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("employee"), employee)));

        if (queryParameter.containsKey("startDate")) {
            LocalDate date = LocalDate.parse(queryParameter.getFirst("startDate"), Constant.DATE_FORMAT_DB);
            predicates.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), date)));
        }
        if (queryParameter.containsKey("endDate")) {
            LocalDate date = LocalDate.parse(queryParameter.getFirst("endDate"), Constant.DATE_FORMAT_DB);
            predicates.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get("joinDate"), date)));
        }
        return predicates.toArray(new Predicate[] {});
    }

}
