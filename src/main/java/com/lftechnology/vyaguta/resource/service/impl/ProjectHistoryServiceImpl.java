package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.slf4j.Logger;

import com.lftechnology.vyaguta.commons.diff.ObjectDiff;
import com.lftechnology.vyaguta.commons.exception.PropertyReadException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.DateUtil;
import com.lftechnology.vyaguta.resource.dao.ContractHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ContractMemberHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ProjectHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ProjectHistoryRootDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractHistory;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.ContractMemberHistory;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectHistory;
import com.lftechnology.vyaguta.resource.entity.ProjectHistoryRoot;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.service.EmployeeService;
import com.lftechnology.vyaguta.resource.service.ProjectHistoryService;
import com.lftechnology.vyaguta.resource.service.UserService;

@Stateless
public class ProjectHistoryServiceImpl implements ProjectHistoryService {

    @Inject
    private Logger log;

    @Inject
    private ProjectHistoryDao projectHistoryDao;

    @Inject
    private ContractHistoryDao contractHistoryDao;

    @Inject
    private ProjectHistoryRootDao projectHistoryRootDao;

    @Inject
    private ContractMemberHistoryDao contractMemberHistoryDao;

    @Inject
    private EmployeeService employeeService;
    @Inject
    private UserService userService;

    private static final String[] projectHistoryFields = new String[] { "title", "description", "accountManager.id", "client.id",
            "projectStatus.id", "projectType.id" };
    private static final String[] contractHistoryFields = new String[] { "budgetType.id", "startDate", "endDate", "actualEndDate",
            "resource" };
    private static final String[] contractMemberHistoryFields = new String[] { "employee.id", "projectRole.id", "allocation", "billed",
            "joinDate", "endDate" };

    @Override
    public void logHistory(Project project) {

        try {
            UUID uuid = UUID.randomUUID();
            ProjectHistoryRoot batch = new ProjectHistoryRoot();
            batch.setId(uuid);
            batch.setReason(project.getReason());

            boolean projectHistoryRootSaved = false;

            ProjectHistory projectHistory = new ProjectHistory(project);
            projectHistory.setBatch(batch);
            ProjectHistory recentPh = projectHistoryDao.findMostRecent(project);

            if (recentPh == null) {
                projectHistory.setEvent(ProjectHistory.EVENT_TYPE_INSERT);
            }

            if (recentPh == null || ObjectDiff.isDifferent(projectHistory, recentPh, projectHistoryFields)) {
                projectHistoryRootDao.save(batch);
                projectHistoryRootSaved = true;
                projectHistoryDao.save(projectHistory);
            }

            for (Contract contract : project.getContracts()) {
                ContractHistory contractHistory = new ContractHistory(contract);
                contractHistory.setBatch(batch);
                ContractHistory recentCh = contractHistoryDao.findMostRecent(contract);

                if (recentCh == null) {
                    contractHistory.setEvent(ProjectHistory.EVENT_TYPE_INSERT);
                }

                if (recentCh == null || ObjectDiff.isDifferent(contractHistory, recentCh, contractHistoryFields)) {
                    if (!projectHistoryRootSaved) {
                        projectHistoryRootDao.save(batch);
                        projectHistoryRootSaved = true;
                    }

                    contractHistoryDao.save(contractHistory);
                }

                for (ContractMember cm : contract.getContractMembers()) {
                    ContractMemberHistory contractMemberHistory = new ContractMemberHistory(cm);
                    contractMemberHistory.setBatch(batch);
                    ContractMemberHistory recentCmh = contractMemberHistoryDao.findMostRecent(cm);

                    if (recentCmh == null) {
                        contractMemberHistory.setEvent(ProjectHistory.EVENT_TYPE_INSERT);
                    }

                    if (recentCmh == null || ObjectDiff.isDifferent(contractMemberHistory, recentCmh, contractMemberHistoryFields)) {
                        if (!projectHistoryRootSaved) {
                            projectHistoryRootDao.save(batch);
                            projectHistoryRootSaved = true;
                        }

                        contractMemberHistoryDao.save(contractMemberHistory);
                    }

                }
            }
        } catch (PropertyReadException e) {
            throw new RuntimeException(e);
        }
    }

    private List<Map<String, Object>> findProjectHistory(Project project) {
        List<ProjectHistory> projectHistories = projectHistoryDao.findHistory(project);
        List<Map<String, Object>> history = new ArrayList<>();

        fetchAndMergeAccountManagers(projectHistories);

        if (projectHistories.size() > 0) {
            ProjectHistory record = projectHistories.get(projectHistories.size() - 1);
            Map<String, Object> historyMap = this.buildProjectHistory(record);
            history.add(historyMap);
        }

        for (int i = projectHistories.size() - 1; i > 0; i--) {
            ProjectHistory record1 = projectHistories.get(i);
            ProjectHistory record2 = projectHistories.get(i - 1);
            Map<String, Object> diff = this.compareProjectHistory(record1, record2);
            if (diff != null) {
                history.add(diff);
            }
        }

        return history;
    }

    private List<Map<String, Object>> findContractHistory(Project project) {
        List<Map<String, Object>> history = new ArrayList<>();

        for (Contract c : project.getContracts()) {
            List<ContractHistory> contractHistories = contractHistoryDao.findHistory(c);

            if (contractHistories.size() > 0) {
                ContractHistory record = contractHistories.get(contractHistories.size() - 1);
                Map<String, Object> historyMap = this.buildContractHistory(record);
                history.add(historyMap);
            }

            for (int i = contractHistories.size() - 1; i > 0; i--) {
                ContractHistory record1 = contractHistories.get(i);
                ContractHistory record2 = contractHistories.get(i - 1);
                Map<String, Object> diff = this.compareContractHistory(record1, record2);
                if (diff != null) {
                    history.add(diff);
                }
            }
        }

        return history;
    }

    private List<Map<String, Object>> findContractMemberHistory(Project project) {
        List<Map<String, Object>> history = new ArrayList<>();

        for (Contract c : project.getContracts()) {
            for (ContractMember cm : c.getContractMembers()) {
                List<ContractMemberHistory> contractMemberHistories = contractMemberHistoryDao.findHistory(cm);

                fetchAndMergeContractMembers(contractMemberHistories);

                if (contractMemberHistories.size() > 0) {
                    ContractMemberHistory record = contractMemberHistories.get(contractMemberHistories.size() - 1);
                    Map<String, Object> historyMap = this.buildContractMemberHistory(record);
                    history.add(historyMap);
                }

                for (int i = contractMemberHistories.size() - 1; i > 0; i--) {
                    ContractMemberHistory record1 = contractMemberHistories.get(i);
                    ContractMemberHistory record2 = contractMemberHistories.get(i - 1);
                    Map<String, Object> diff = this.compareContractMemberHistory(record1, record2);
                    if (diff != null) {
                        history.add(diff);
                    }
                }
            }
        }

        return history;
    }

    @Override
    public List<Map<String, Object>> findHistory(Project project) {
        List<Map<String, Object>> history = new ArrayList<>();
        history.addAll(findProjectHistory(project));
        history.addAll(findContractHistory(project));
        history.addAll(findContractMemberHistory(project));

        history = history.stream().sorted(this::compare).collect(Collectors.toList());

        fetchAndMergeUsers(history);
        convertDateAndDateTimeToString(history);

        return history;
    }

    private void convertDateAndDateTimeToString(List<Map<String, Object>> data) {
        for (Map<String, Object> map : data) {
            for (String key : map.keySet()) {
                Object value = map.get(key);
                if (value != null && value instanceof LocalDate) {
                    LocalDate date = (LocalDate) value;
                    map.put(key, DateUtil.formatDate(date));
                } else if (value != null && value instanceof LocalDateTime) {
                    LocalDateTime dateTime = (LocalDateTime) value;
                    map.put(key, DateUtil.formatDateTime(dateTime));
                }
            }
        }
    }

    int compare(Map<String, Object> m1, Map<String, Object> m2) {
        LocalDateTime d1 = (LocalDateTime) m1.get("createdAt");
        LocalDateTime d2 = (LocalDateTime) m2.get("createdAt");

        int comparision = d2.compareTo(d1);
        if (comparision == 0) {
            String changed1 = m1.get("changedEntity").toString();

            comparision = changed1.equals("Project") ? -1 : changed1.equals("Contract") ? -1 : changed1.equals("ContractMember") ? -1 : 1;
        }
        return comparision;
    }

    private Map<String, Object> compareProjectHistory(ProjectHistory record1, ProjectHistory record2) {
        String[] fields = new String[] { "title", "description", "accountManager", "projectType", "projectStatus", "client" };
        Map<String, Object> map = null;
        try {

            map = ObjectDiff.changedValues(record1, record2, fields);
            if (map.size() == 0)
                return null;

            map.put("batch", record2.getBatch().getId());
            map.put("reason", record2.getBatch().getReason());
            map.put("changed", record2.getEvent() == 1 ? false : true);
            map.put("changedEntity", "Project");
            map.put("createdBy", record2.getBatch().getCreatedBy());
            map.put("createdAt", record2.getBatch().getCreatedAt());
        } catch (PropertyReadException e) {
            log.debug(e.getMessage(), e);
        }
        return map;
    }

    private Map<String, Object> compareContractHistory(ContractHistory record1, ContractHistory record2) {
        String[] fields = new String[] { "budgetType", "endDate", "startDate", "actualEndDate", "resource" };

        Map<String, Object> map = null;

        try {
            map = ObjectDiff.changedValues(record1, record2, fields);
            if (map.size() == 0)
                return null;

            map.put("batch", record2.getBatch().getId());
            map.put("reason", record2.getBatch().getReason());
            map.put("changed", record2.getEvent() == 1 ? false : true);
            map.put("changedEntity", "Contract");
            map.put("createdBy", record2.getBatch().getCreatedBy());
            map.put("createdAt", record2.getBatch().getCreatedAt());
        } catch (PropertyReadException e) {
            log.debug(e.getMessage(), e);
        }

        return map;
    }

    private Map<String, Object> compareContractMemberHistory(ContractMemberHistory record1, ContractMemberHistory record2) {
        String[] fields = new String[] { "projectRole", "allocation", "billed", "joinDate", "endDate" };

        Map<String, Object> map = null;
        try {
            map = ObjectDiff.changedValues(record1, record2, fields);
            if (map.size() == 0)
                return null;

            map.put("employee", record2.getEmployee());
            map.put("batch", record2.getBatch().getId());
            map.put("reason", record2.getBatch().getReason());
            map.put("changed", record2.getEvent() == 1 ? false : true);
            map.put("changedEntity", "ContractMember");
            map.put("createdBy", record2.getBatch().getCreatedBy());
            map.put("createdAt", record2.getBatch().getCreatedAt());
        } catch (PropertyReadException e) {
            log.debug(e.getMessage(), e);
        }
        return map;
    }

    private Map<String, Object> buildProjectHistory(ProjectHistory record) {
        Map<String, Object> map = new HashMap<>();
        map.put("title", record.getTitle());
        map.put("description", record.getDescription());
        map.put("accountManager", record.getAccountManager());
        map.put("projectType", record.getProjectType());
        map.put("projectStatus", record.getProjectStatus());
        map.put("client", record.getClient());
        map.put("batch", record.getBatch().getId());
        map.put("reason", record.getBatch().getReason());
        map.put("changed", false);
        map.put("changedEntity", "Project");

        map.put("createdBy", record.getBatch().getCreatedBy());
        map.put("createdAt", record.getBatch().getCreatedAt());

        return map;
    }

    private Map<String, Object> buildContractHistory(ContractHistory record) {
        Map<String, Object> map = new HashMap<>();
        map.put("budgetType", record.getBudgetType());
        map.put("endDate", record.getEndDate());
        map.put("resource", record.getResource());
        map.put("startDate", record.getStartDate());
        map.put("actualEndDate", record.getActualEndDate());
        map.put("batch", record.getBatch().getId());
        map.put("reason", record.getBatch().getReason());
        map.put("changed", false);
        map.put("changedEntity", "Contract");

        map.put("createdBy", record.getBatch().getCreatedBy());
        map.put("createdAt", record.getBatch().getCreatedAt());

        return map;
    }

    private Map<String, Object> buildContractMemberHistory(ContractMemberHistory record) {
        Map<String, Object> map = new HashMap<>();
        map.put("employee", record.getEmployee());
        map.put("joinDate", record.getJoinDate());
        map.put("endDate", record.getEndDate());
        map.put("projectRole", record.getProjectRole());
        map.put("allocation", record.getAllocation());
        map.put("billed", record.isBilled());
        map.put("batch", record.getBatch().getId());
        map.put("reason", record.getBatch().getReason());
        map.put("changed", false);
        map.put("changedEntity", "ContractMember");

        map.put("createdBy", record.getBatch().getCreatedBy());
        map.put("createdAt", record.getBatch().getCreatedAt());

        return map;
    }

    private void fetchAndMergeAccountManagers(List<ProjectHistory> data) {
        List<UUID> employeeIds = data.stream().filter(emp -> emp.getAccountManager() != null).map(emp -> emp.getAccountManager().getId())
                .distinct().collect(Collectors.toList());
        if (employeeIds.size() == 0)
            return;
        List<Employee> accountManagers = employeeService.fetchEmployees(employeeIds);

        for (ProjectHistory ph : data) {
            for (Employee am : accountManagers) {
                if (ph.getAccountManager() != null && am.getId().equals(ph.getAccountManager().getId())) {
                    ph.setAccountManager(am);
                }
            }
        }
    }

    private void fetchAndMergeUsers(List<Map<String, Object>> data) {
        List<UUID> userIds = data.stream().map(p -> ((User) p.get("createdBy")).getId()).distinct().collect(Collectors.toList());
        System.out.println(userIds);
        if (userIds.size() == 0)
            return;
        List<User> users = userService.fetchUsers(userIds);

        for (Map<String, Object> map : data) {
            for (User createdBy : users) {
                if (createdBy.getId().equals(((User) map.get("createdBy")).getId())) {
                    map.put("createdBy", createdBy);
                }
            }
        }
    }

    private void fetchAndMergeContractMembers(List<ContractMemberHistory> data) {
        List<UUID> employeeIds = new ArrayList<>();
        for (ContractMemberHistory cmh : data) {
            if (cmh.getEmployee() != null) {
                employeeIds.add(cmh.getEmployee().getId());
            }
        }
        if (employeeIds.size() == 0)
            return;

        List<Employee> employees = employeeService.fetchEmployees(employeeIds);

        for (ContractMemberHistory cmh : data) {
            for (Employee employee : employees) {
                if (cmh.getEmployee() != null && cmh.getEmployee().getId().equals(employee.getId())) {
                    cmh.setEmployee(employee);
                }
            }
        }
    }
}
