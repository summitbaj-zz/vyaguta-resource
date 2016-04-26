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

import com.google.common.base.Strings;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.pojo.AvailableResource;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.EmployeeService;
import com.lftechnology.vyaguta.resource.service.ProjectHistoryService;
import com.lftechnology.vyaguta.resource.service.ProjectService;

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
    private ProjectHistoryService projectHistoryService;

    @Override
    public Project save(Project project) {
        this.validateDates(project);
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

        this.validateDates(obj);
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

        List<Employee> accountManagers = employeeService.fetchEmployees(employeeIds);

        for (Project project : data) {
            for (Employee am : accountManagers) {
                if (project.getAccountManager() != null && am.getId().equals(project.getAccountManager().getId())) {
                    project.setAccountManager(am);
                }
            }
        }
    }

    private void setEmployeeDetails(Project project) {
        List<UUID> employeeId = new ArrayList<>();
        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                if (cm.getEmployee().getId() != null) {
                    employeeId.add(cm.getEmployee().getId());
                }
            }
        }

        if (!employeeId.isEmpty()) {
            List<Employee> employees = employeeService.fetchEmployees(employeeId);
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
        Map<String, Object> resource = contactMemberDao.findBilledAndUnbilledResource(date);
        Double unbilled = (Double) resource.get("unbilled");
        Double billed = (Double) resource.get("billed");
        Double bookedResourcesCount = billed + unbilled;

        Double totalEmployee = Double.valueOf(employeeService.fetchActiveEmployees().size());
        Double freeResourceCount = totalEmployee - bookedResourcesCount;

        Map<String, Object> resultOutput = new HashMap<>();
        resultOutput.put("totalResource", totalEmployee);
        resultOutput.put("bookedResource", new HashMap<String, Double>() {
            {
                put("bookedResourceCount", bookedResourcesCount);
                put("billed", billed);
                put("unbilled", unbilled);
            }
        });
        resultOutput.put("freeResource", freeResourceCount);
        return resultOutput;
    }

    @Override
    public List<AvailableResource> findAvailableResource(LocalDate date) {

        List<Employee> employeeList = employeeService.fetchActiveEmployees();
        Map<UUID, Double> allocatedMembers = contactMemberDao.findAvailableResource(date);

        List<AvailableResource> availableResource = new ArrayList<>();
        for (Employee employee : employeeList) {
            AvailableResource ar = new AvailableResource();

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
        return availableResource.stream().sorted((e1, e2) -> Double.compare(e2.getAvailableAllocation(), e1.getAvailableAllocation()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> findOverdueProjects(String projectStatus) {
        LocalDate today = LocalDate.now();
        List<Map<String, Object>> overdueProjects = projectDao.findOverdueProjects(projectStatus);
        return overdueProjects.stream().filter(p -> today.isAfter((LocalDate) p.get("endDate")))
                .sorted((e1, e2) -> e2.get("endDate").toString().compareTo(e1.get("endDate").toString())).map(e1 -> {
                    e1.put("endDate", e1.get("endDate").toString());
                    return e1;
                }).collect(Collectors.toList());
    }

}
