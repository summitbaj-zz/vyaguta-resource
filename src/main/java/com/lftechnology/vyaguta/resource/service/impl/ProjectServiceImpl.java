package com.lftechnology.vyaguta.resource.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.slf4j.Logger;

import com.google.common.base.Strings;
import com.lftechnology.vyaguta.commons.diff.ObjectDiff;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.commons.exception.PropertyReadException;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.ContractDao;
import com.lftechnology.vyaguta.resource.dao.ContractHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ContractMemberHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.ProjectHistoryDao;
import com.lftechnology.vyaguta.resource.dao.ProjectHistoryRootDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.ContractHistory;
import com.lftechnology.vyaguta.resource.entity.ContractMember;
import com.lftechnology.vyaguta.resource.entity.ContractMemberHistory;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectHistory;
import com.lftechnology.vyaguta.resource.entity.ProjectHistoryRoot;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.service.ProjectService;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Stateless
public class ProjectServiceImpl implements ProjectService {

    private static final DateTimeFormatter formatterDateTime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Inject
    private Logger log;

    @Inject
    private ProjectDao projectDao;

    @Inject
    private ProjectHistoryDao projectHistoryDao;

    @Inject
    private TagDao tagDao;

    @Inject
    private ContractDao contractDao;

    @Inject
    private ContractHistoryDao contractHistoryDao;

    @Inject
    private ProjectHistoryRootDao projectHistoryRootDao;

    @Inject
    private ContractMemberHistoryDao contractMemberHistoryDao;

    @Override
    public Project save(Project project) {
        this.fixTags(project);
        this.fixContract(project);
        projectDao.save(project);
        this.logHistory(project);
        return project;
    }

    @Override
    public Project update(Project project) {
        project = projectDao.update(project);
        this.logHistory(project);
        return project;
    }

    @Override
    public Project merge(UUID id, Project obj) {
        if (!this.hasReason(obj)) {
            throw new ParameterFormatException("Reason field expected");
        }

        Project project = this.findById(id);
        if (project == null) {
            throw new ObjectNotFoundException();
        }

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
        return projectDao.findById(id);
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
        return new HashMap<String, Object>() {
            {
                put("count", projectDao.count(queryParameters));
                put("data", projectDao.findByFilter(queryParameters));
            }
        };
    }

    private void fixTags(Project project) {
        List<Tag> newTagList = new ArrayList<>();
        /*
         * Eliminate redundant Tag objects, which is evaluated comparing title fields
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

            if (c.getId() == null)
                this.contractDao.save(c);
            // else
            // this.contractDao.update(c);
            // TODO check this
        }

    }

    @SuppressWarnings({ "serial" })
    private Tag findTagByTitle(String title) {
        List<Tag> tags = tagDao.findByFilter(new MultivaluedMapImpl<>(new HashMap<String, List<String>>() {
            {
                put("title", Arrays.asList(title));
            }
        }));
        return tags.size() > 0 ? tags.get(0) : null;
    }

    private void fixContract(Project project) {
        for (Contract contract : project.getContracts()) {
            for (ContractMember cm : contract.getContractMembers()) {
                cm.setContract(contract);
            }
            contract.setProject(project);
        }
    }

    private boolean hasReason(Project project) {
        if (!Strings.isNullOrEmpty(project.getReason())) {
            return true;
        }
        return false;
    }

    private void logHistory(Project project) {
        UUID uuid = UUID.randomUUID();
        ProjectHistoryRoot batch = new ProjectHistoryRoot();
        batch.setId(uuid);
        batch.setReason(project.getReason());
        projectHistoryRootDao.save(batch);

        ProjectHistory projectHistory = new ProjectHistory(project);
        projectHistory.setBatch(batch);

        for (Contract contract : project.getContracts()) {
            ContractHistory contractHistory = new ContractHistory(contract);
            contractHistory.setBatch(batch);
            contractHistoryDao.save(contractHistory);

            for (ContractMember cm : contract.getContractMembers()) {
                ContractMemberHistory contractMemberHistory = new ContractMemberHistory(cm);
                contractMemberHistory.setBatch(batch);
                contractMemberHistoryDao.save(contractMemberHistory);
            }
        }
        projectHistoryDao.save(projectHistory);
    }

    private List<Map<String, Object>> findProjectHistory(Project project) {
        List<ProjectHistory> projectHistories = projectHistoryDao.findHistory(project);
        List<Map<String, Object>> history = new ArrayList<>();

        if (projectHistories.size() > 0) {
            ProjectHistory record = projectHistories.get(0);
            Map<String, Object> historyMap = this.buildProjectHistory(record);
            history.add(historyMap);
        }

        for (int i = 0; i < projectHistories.size() - 1; i++) {
            ProjectHistory recordFirst = projectHistories.get(i);
            ProjectHistory recordSecond = projectHistories.get(i + 1);
            Map<String, Object> diff = this.compareProjectHistory(recordFirst, recordSecond);
            if (diff != null) {
                history.add(diff);
            }
        }

        return history;
    }

    private List<Map<String, Object>> findContractHistory(Project project) {
        List<ContractHistory> contractHistories = contractHistoryDao.findHistory(project);
        List<Map<String, Object>> history = new ArrayList<>();

        if (contractHistories.size() > 0) {
            ContractHistory record = contractHistories.get(0);
            Map<String, Object> historyMap = this.buildContractHistory(record);
            history.add(historyMap);
        }

        for (int i = 0; i < contractHistories.size() - 1; i++) {
            ContractHistory recordFirst = contractHistories.get(i);
            ContractHistory recordSecond = contractHistories.get(i + 1);
            Map<String, Object> diff = this.compareContractHistory(recordFirst, recordSecond);
            if (diff != null) {
                history.add(diff);
            }
        }

        return history;
    }

    private List<Map<String, Object>> findContractMemberHistory(Project project) {
        List<ContractMemberHistory> contractMemberHistories = contractMemberHistoryDao.findHistory(project);
        List<Map<String, Object>> history = new ArrayList<>();

        if (contractMemberHistories.size() > 0) {
            ContractMemberHistory record = contractMemberHistories.get(0);
            Map<String, Object> historyMap = this.buildContractMemberHistory(record);
            history.add(historyMap);
        }

        for (int i = 0; i < contractMemberHistories.size() - 1; i++) {
            ContractMemberHistory recordFirst = contractMemberHistories.get(i);
            ContractMemberHistory recordSecond = contractMemberHistories.get(i + 1);
            Map<String, Object> diff = this.compareContractMemberHistory(recordFirst, recordSecond);
            if (diff != null) {
                history.add(diff);
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

        for (Map<String, Object> map : history) {
            LocalDateTime createdAt = (LocalDateTime) map.get("createdAt");
            map.put("createdAt", formatDateTime(createdAt));
        }

        return history;
    }

    int compare(Map<String, Object> m1, Map<String, Object> m2) {
        LocalDateTime d1 = (LocalDateTime) m1.get("createdAt");
        LocalDateTime d2 = (LocalDateTime) m2.get("createdAt");

        return d1.compareTo(d2);
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
            map.put("changed", true);
            map.put("changedEntity", "Project");
            map.put("createdBy", record2.getBatch().getCreatedBy());
            map.put("createdAt", record2.getBatch().getCreatedAt());
        } catch (PropertyReadException e) {
            log.debug(e.getMessage(), e);
        }
        return map;
    }

    private Map<String, Object> compareContractHistory(ContractHistory record1, ContractHistory record2) {
        String[] fields = new String[] { "budgetType", "contract", "endDate", "project", "startDate", "actualEndDate", "resource" };

        Map<String, Object> map = null;

        try {
            map = ObjectDiff.changedValues(record1, record2, fields);
            if (map.size() == 0)
                return null;

            map.put("batch", record2.getBatch().getId());
            map.put("reason", record2.getBatch().getReason());
            map.put("changed", true);
            map.put("changedEntity", "Contract");
            map.put("createdBy", record2.getBatch().getCreatedBy());
            map.put("createdAt", record2.getBatch().getCreatedAt());
        } catch (PropertyReadException e) {
            log.debug(e.getMessage(), e);
        }

        return map;
    }

    private Map<String, Object> compareContractMemberHistory(ContractMemberHistory record1, ContractMemberHistory record2) {
        String[] fields =
                new String[] { "contractMember", "contract", "employee", "projectRole", "allocation", "billed", "joinDate", "endDate" };

        Map<String, Object> map = null;
        try {
            map = ObjectDiff.changedValues(record1, record2, fields);
            if (map.size() == 0)
                return null;

            map.put("batch", record2.getBatch().getId());
            map.put("reason", record2.getBatch().getReason());
            map.put("changed", true);
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
        map.put("endDate", formatDate(record.getEndDate()));
        map.put("resource", record.getResource());
        map.put("startDate", formatDate(record.getStartDate()));
        map.put("actualEndDate", formatDate(record.getActualEndDate()));
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
        map.put("joinDate", formatDate(record.getJoinDate()));
        map.put("endDate", formatDate(record.getEndDate()));
        map.put("projectRole", record.getProjectRole());
        map.put("allocation", record.getAllocation());
        map.put("batch", record.getBatch().getId());
        map.put("reason", record.getBatch().getReason());
        map.put("changed", false);
        map.put("changedEntity", "ContractMember");

        map.put("createdBy", record.getBatch().getCreatedBy());
        map.put("createdAt", record.getBatch().getCreatedAt());

        return map;
    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime == null ? null : dateTime.format(formatterDateTime);
    }

    private static String formatDate(LocalDate date) {
        return date == null ? null : date.format(formatterDate);
    }
}
