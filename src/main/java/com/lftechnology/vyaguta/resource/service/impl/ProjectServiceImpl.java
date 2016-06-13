package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;

import com.google.common.base.Strings;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.dao.OperationalResourceDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.OperationalResource;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.pojo.AvailableResource;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.EmployeeService;
import com.lftechnology.vyaguta.resource.service.ProjectHistoryService;
import com.lftechnology.vyaguta.resource.service.ProjectService;

import rx.Observable;
import rx.Subscriber;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Stateless
public class ProjectServiceImpl implements ProjectService {

    @Inject
    private ProjectDao projectDao;

    @Inject
    private TagDao tagDao;

    @Inject
    private EmployeeService employeeService;

    @Inject
    private ContractMemberDao contactMemberDao;

    @Inject
    private OperationalResourceDao operationalResourceDao;

    @Inject
    private ProjectHistoryService projectHistoryService;

    @Inject
    private ContractDao contractDao;

    @Override
    public Project save(Project project) {
        this.validateDates(project);
        this.validateAllocations(project);
        this.fixTags(project);
        this.fixContract(project);
        projectDao.save(project);
        projectHistoryService.logHistory(project);
        return project;
    }

    @Override
    public Project update(Project project) {
        project = projectDao.update(project);
        projectHistoryService.logHistory(project);
        return project;
    }

    @Override
    public Project merge(UUID id, Project obj) {
        if (Strings.isNullOrEmpty(obj.getReason())) {
            throw new ParameterFormatException("Reason field expected");
        }

        Project project = this.findById(id);
        if (project == null) {
            throw new ObjectNotFoundException();
        }

        obj.setId(project.getId());

        this.validateDates(obj);
        this.validateAllocations(obj);
        this.fixTags(obj);
        this.fixContracts(project, obj);

        project.setTitle(obj.getTitle());
        project.setDescription(obj.getDescription());
        project.setProjectStatus(obj.getProjectStatus());
        project.setProjectType(obj.getProjectType());
        project.setAccountManager(obj.getAccountManager());
        project.setTags(obj.getTags());
        project.setClient(obj.getClient());
        project.setReason(obj.getReason());
        return this.update(project);
    }

    @Override
    public void remove(Project entity) {
        projectDao.remove(entity);
    }

    @Override
    public void removeById(UUID id) {
        Project project = this.findById(id);
        if (project == null) {
            throw new ObjectNotFoundException();
        }
        this.remove(project);
    }

    @Override
    public Project findById(UUID id) {
        Project project = projectDao.findById(id);
        if (project == null)
            return null;

        fetchAndMergeAccountManagers(new ArrayList<Project>() {
            {
                add(project);
            }
        });

        setEmployeeDetails(project);
        return project;
    }

    @Override
    public List<Project> findAll() {
        return projectDao.findAll();
    }

    @Override
    public Long count() {
        return projectDao.count(null);
    }

    @Override
    public List<Project> find(Integer start, Integer offset) {
        return projectDao.find(start, offset);
    }

    @Override
    @SuppressWarnings("serial")
    public Map<String, Object> findByFilter(MultivaluedMap<String, String> queryParameters) {
        List<Project> data = projectDao.findByFilter(queryParameters);

        fetchAndMergeAccountManagers(data);

        return new HashMap<String, Object>() {
            {
                put("count", projectDao.count(queryParameters));
                put("data", data);
            }
        };
    }

    public void fetchAndMergeAccountManagers(List<Project> data) {
        List<UUID> employeeIds = data.stream().filter(emp -> emp.getAccountManager() != null).map(emp -> emp.getAccountManager().getId())
                .distinct().collect(Collectors.toList());
        if (employeeIds.isEmpty())
            return;

        Observable<List<Employee>> accountManagers = employeeService.fetchEmployeeInReactiveWay(employeeIds);
        accountManagers.subscribe(new Subscriber<List<Employee>>() {

            @Override
            public void onCompleted() {
            }

            @Override
            public void onError(Throwable e) {
                throw new WebApplicationException(e.getMessage());
            }

            @Override
            public void onNext(List<Employee> accountManagers) {
                for (Project project : data) {
                    for (Employee am : accountManagers) {
                        if (project.getAccountManager() != null && am.getId().equals(project.getAccountManager().getId())) {
                            project.setAccountManager(am);
                        }
                    }
                }
            }
        });

    }

    private void setEmployeeDetails(Project project) {
        List<UUID> employeeIds = new ArrayList<>();
        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                if (cm.getEmployee().getId() != null) {
                    employeeIds.add(cm.getEmployee().getId());
                }
            }
        }

        if (employeeIds.isEmpty()) {
            return;
        }

        Observable<List<Employee>> employees = employeeService.fetchEmployeeInReactiveWay(employeeIds);
        employees.subscribe(new Subscriber<List<Employee>>() {

            @Override
            public void onCompleted() {
            }

            @Override
            public void onError(Throwable e) {
                throw new WebApplicationException(e.getMessage());
            }

            @Override
            public void onNext(List<Employee> employees) {
                for (Contract contract : project.getContracts()) {
                    for (ContractMember cm : contract.getContractMembers()) {
                        for (Employee employee : employees) {
                            if (cm.getEmployee().equals(employee)) {
                                cm.setEmployee(employee);
                            }
                        }
                    }
                }
            }
        });

    }

    private void fixTags(Project project) {
        List<Tag> newTagList = new ArrayList<>();
        /*
         * Eliminate redundant Tag objects, which is evaluated comparing title
         * fields
         */
        List<Tag> uniqueTagList = project.getTags().stream().filter(p -> p.getTitle() != null).distinct().collect(Collectors.toList());

        for (final Tag tempTag : uniqueTagList) {
            Tag result = findTagByTitle(tempTag.getTitle());

            if (result == null) {
                newTagList.add(tagDao.save(tempTag));
            } else {
                newTagList.add(result);
            }
        }
        project.setTags(newTagList);
    }

    private void fixContracts(Project project, Project obj) {
        project.getContracts().clear();
        project.getContracts().addAll(obj.getContracts());

        for (Contract c : obj.getContracts()) {
            c.setProject(project);
        }
    }

    @SuppressWarnings({ "serial" })
    private Tag findTagByTitle(String title) {
        List<Tag> tags = tagDao.findByFilter(new MultivaluedMapImpl<>(new HashMap<String, List<String>>() {
            {
                put("title", Arrays.asList(title));
            }
        }));
        return !tags.isEmpty() ? tags.get(0) : null;
    }

    private void fixContract(Project project) {
        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                cm.setContract(contract);
            }
            contract.setProject(project);
        }
    }

    private void validateDates(Project project) {
        for (Contract c : project.getContracts()) {
            if (!c.isDateRangeValid()) {
                throw new ParameterFormatException("Contract start date must be before end date");
            }
            for (ContractMember cm : c.getContractMembers()) {
                if (!cm.isDateRangeValid()) {
                    throw new ParameterFormatException(cm.getEmployee().getFirstName() + "'s join date must be before end date");
                }

                if (this.validateDateRange(c.getStartDate(), cm.getJoinDate()) || this.validateDateRange(cm.getEndDate(), c.getEndDate())) {
                    throw new ParameterFormatException(
                            cm.getEmployee().getFirstName() + "'s allocation date contradicts with contract's date range");
                }
            }
        }
    }

    private void validateAllocations(Project project) {
        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                Double allocation = 0d;
                if (project.getId() == null) {
                    allocation = contactMemberDao.findProjectAllocation(cm.getEmployee(), cm.getJoinDate(), cm.getEndDate());
                } else {
                    allocation = contactMemberDao.findProjectAllocation(cm.getEmployee(), project, cm.getJoinDate(), cm.getEndDate());
                }
                List<ContractMember> contractMembers = filterContractMembers(project, cm);

                Double sum = 0d;

                for (ContractMember tempCm : contractMembers) {
                    sum += tempCm.getAllocation();

                }
                if (allocation + sum > 100) {
                    Employee employee = fetchEmployee(cm.getEmployee().getId());
                    String employeeName = employee == null ? "Unknown user" : employee.getFirstName();
                    throw new ParameterFormatException(employeeName + "'s total allocation cannot be more than 100%");
                }
            }
        }

    }

    private Employee fetchEmployee(UUID id) {
        List<UUID> employeeIds = new ArrayList<UUID>();
        employeeIds.add(id);
        List<Employee> employees = employeeService.fetchEmployees(employeeIds);
        if (employees.size() > 0)
            return employees.get(0);
        return null;
    }

    private boolean overlaps(LocalDate d1, LocalDate d2, LocalDate e1, LocalDate e2) {
        if ((isEqualOrBefore(d1, e1) && isEqualOrAfter(d2, e1)) || (isEqualOrBefore(d1, e2) && isEqualOrAfter(d2, e2))
                || (isEqualOrBefore(d1, e1) && isEqualOrAfter(d2, e2))) {
            return true;
        }
        return false;
    }

    private boolean isEqualOrBefore(LocalDate d1, LocalDate d2) {
        if (d1.isEqual(d2) || d1.isBefore(d2))
            return true;
        return false;
    }

    private boolean isEqualOrAfter(LocalDate d1, LocalDate d2) {
        if (d1.isEqual(d2) || d1.isAfter(d2))
            return true;
        return false;
    }

    private List<ContractMember> filterContractMembers(Project project, ContractMember cmember) {
        List<ContractMember> contractMembers = new ArrayList<>();

        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                if (cm.getEmployee().getId().equals(cmember.getEmployee().getId())) {
                    if (overlaps(cm.getJoinDate(), cm.getEndDate(), cmember.getJoinDate(), cmember.getEndDate())) {
                        contractMembers.add(cm);
                    }
                }
            }
        }
        return contractMembers;
    }

    private Boolean validateDateRange(LocalDate start, LocalDate end) {
        if (start != null && end != null) {
            return end.isBefore(start);
        }
        return false;
    }

    @Override
    public List<Map<String, Object>> findBookedResource(LocalDate date) {
        return projectDao.findBookedResource(date);
    }

    @Override
    public Map<String, Object> findResourceUtilization(LocalDate date) {
        // Billed and Unbilled resource for contracted Resources
        Map<String, Object> contractResource = contactMemberDao.findBilledAndUnbilledResource(date);
        Double contractUnbilled = (Double) contractResource.get("unbilled");
        Double contractBilled = (Double) contractResource.get("billed");

        // Billed and Unbilled resource for operational Resources
        Map<String, Object> operationalResource = operationalResourceDao.findBilledAndUnbilledResource(date);
        Double operationalBilled = Double.valueOf(operationalResource.get("billed").toString());
        Double operationalUnbilled = Double.valueOf(operationalResource.get("unbilled").toString());

        // Calculation of total billed and unbilled resources
        Double operationalResourceCount = Double.valueOf(operationalResourceDao.findAll().size());
        Double nonProjectOperationalUnbilled = operationalResourceCount - (operationalBilled + operationalUnbilled);
        Double totalUnbilled = contractUnbilled + nonProjectOperationalUnbilled;
        Double bookedResourceCount = contractBilled + totalUnbilled;

        Double totalEmployee = Double.valueOf(employeeService.fetchActiveEmployeesUnderProjectResource().size());

        Map<String, Object> resultOutput = new HashMap<>();
        resultOutput.put("totalResource", totalEmployee);
        resultOutput.put("bookedResource", new HashMap<String, Double>() {
            {
                put("bookedResourceCount", bookedResourceCount);
                put("billed", contractBilled);
                put("unbilled", totalUnbilled);
            }
        });
        Double freeResource = totalEmployee - bookedResourceCount;
        resultOutput.put("freeResource", freeResource < 0 ? 0 : freeResource);
        return resultOutput;
    }

    @Override
    public List<AvailableResource> findAvailableResource(LocalDate date) {
        List<Employee> employeeList = employeeService.fetchActiveEmployeesUnderProjectResource();
        Map<UUID, Double> allocatedMembers = contactMemberDao.findAvailableResource(date);

        List<UUID> operationalEmployeeIds = getOperationalEmployeeIds();

        List<AvailableResource> availableResource = calculateAvailableResource(employeeList, operationalEmployeeIds, allocatedMembers);

        return availableResource.stream().sorted((e1, e2) -> Double.compare(e2.getAvailableAllocation(), e1.getAvailableAllocation()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> findOverdueProjects(String projectStatus) {
        LocalDate today = LocalDate.now();
        List<Map<String, Object>> overdueProjects = projectDao.findOverdueProjects(projectStatus);
        return overdueProjects.stream().filter(p -> p.get("endDate") != null && today.isAfter((LocalDate) p.get("endDate")))
                .sorted((e1, e2) -> e2.get("endDate").toString().compareTo(e1.get("endDate").toString())).map(e1 -> {
                    e1.put("endDate", e1.get("endDate").toString());
                    return e1;
                }).collect(Collectors.toList());
    }

    @Override
    public List<Contract> findContractsEndingBefore(LocalDate date) {
        return contractDao.findContractsEndingBefore(date);
    }

    @Override
    public List<Project> findContractsEndingIn(int days) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(days);

        List<Contract> contracts = projectDao.contractsEndingBetween(startDate, endDate);
        return contracts.stream().map(p -> p.getProject()).distinct().collect(Collectors.toList());
    }

    protected List<UUID> getOperationalEmployeeIds() {
        List<OperationalResource> operationalResources = operationalResourceDao.findAll();
        List<UUID> operationalEmployeeIds = new ArrayList<UUID>();
        for (OperationalResource operationalResource : operationalResources) {
            operationalEmployeeIds.add(operationalResource.getEmployee().getId());
        }
        return operationalEmployeeIds;
    }

    protected List<AvailableResource> calculateAvailableResource(List<Employee> employeeList, List<UUID> operationalEmployeeIds,
            Map<UUID, Double> allocatedMembers) {
        List<AvailableResource> availableResource = new ArrayList<>();
        for (Employee employee : employeeList) {
            AvailableResource ar = new AvailableResource();

            if (operationalEmployeeIds.contains(employee.getId())) {
                continue;
            }

            if (allocatedMembers.containsKey(employee.getId())) {
                if (allocatedMembers.get(employee.getId()) >= 1) {
                    continue;
                } else {
                    ar.setAvailableAllocation(1 - allocatedMembers.get(employee.getId()));
                }
            }
            ar.setId(employee.getId());
            ar.setFirstName(employee.getFirstName());
            ar.setMiddleName(employee.getMiddleName());
            ar.setLastName(employee.getLastName());
            ar.setDesignation(employee.getDesignation().getTitle());
            availableResource.add(ar);
        }
        return availableResource;
    }

}
