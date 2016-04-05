package com.lftechnology.vyaguta.resource.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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
        return projectDao.save(project);
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
            else
                this.contractDao.update(c);
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

        ProjectHistory projectHistory = new ProjectHistory(project);
        projectHistory.setBatch(uuid);

        ProjectHistoryRoot projectHistoryRoot = new ProjectHistoryRoot();
        projectHistoryRoot.setId(uuid);
        projectHistoryRoot.setReason(project.getReason());
        projectHistoryRootDao.save(projectHistoryRoot);

        for (Contract contract : project.getContracts()) {
            ContractHistory contractHistory = new ContractHistory(contract);
            contractHistory.setBatch(uuid);
            contractHistoryDao.save(contractHistory);

            for (ContractMember cm : contract.getContractMembers()) {
                ContractMemberHistory contractMemberHistory = new ContractMemberHistory(cm);
                contractMemberHistory.setBatch(uuid);
                contractMemberHistoryDao.save(contractMemberHistory);
            }
        }
        projectHistoryDao.save(projectHistory);
    }

    @Override
    public Map<String, Object> history(UUID id) {
        Map<String, Object> historyMap = new HashMap<>();
        List<Object> allHistory = new ArrayList<>();
        List<ProjectHistory> projectHistory = projectHistoryDao.historyById(id);
        if (projectHistory.size() == 1) {
            ProjectHistory record = projectHistory.get(0);
            allHistory.add(this.newProjectHistoryRecord(record));
        } else {
            for (int i = 0; i < projectHistory.size() - 1; i++) {
                ProjectHistory recordFirst = projectHistory.get(i);
                ProjectHistory recordSecond = projectHistory.get(i + 1);
                allHistory.add(this.alterProjectHistoryRecord(recordFirst, recordSecond));
            }
        }
        historyMap.put("projects", allHistory);
        return historyMap;
    }

    private Map<String, Object> alterProjectHistoryRecord(ProjectHistory record1, ProjectHistory record2) {
        Map<String, Object> alterMap = new HashMap<>();

        if (record1.getTitle() == null && record2.getTitle() != null) {
            alterMap.put("title", record2.getTitle());

        } else if (record1.getTitle() != null && record2.getTitle() == null) {
            alterMap.put("title", null);

        } else if (record1.getTitle() != null && record2.getTitle() != null && !record1.getTitle().equals(record2.getTitle())) {
            alterMap.put("title", record2.getTitle());

        }
        if (record1.getDescription() == null && record2.getDescription() != null) {
            alterMap.put("description", record2.getDescription());

        } else if (record1.getDescription() != null && record2.getDescription() == null) {
            alterMap.put("description", null);

        } else if (record1.getDescription() != null && record2.getDescription() != null
                && !record1.getDescription().equals(record2.getDescription())) {
            alterMap.put("description", record2.getDescription());
        }
        if (record1.getAccountManager() == null && record2.getAccountManager() != null) {
            alterMap.put("accountManager", record2.getAccountManager());

        } else if (record1.getAccountManager() != null && record2.getAccountManager() == null) {
            alterMap.put("accountManager", null);

        } else if (record1.getAccountManager() != null && record2.getAccountManager() != null
                && !record1.getProjectType().equals(record2.getProjectType())) {
            alterMap.put("accountManager", record2.getAccountManager());

        }
        if (record1.getProjectType() == null && record2.getProjectType() != null) {
            alterMap.put("projectType", record2.getProjectType());

        } else if (record1.getProjectType() != null && record2.getProjectType() == null) {
            alterMap.put("projectType", null);

        } else if (record1.getProjectType() != null && record2.getProjectType() != null
                && !record1.getProjectType().equals(record2.getProjectType())) {
            alterMap.put("projectType", record2.getProjectType());

        }
        if (record1.getProjectStatus() == null && record2.getProjectStatus() != null) {
            alterMap.put("projectStatus", record2.getProjectStatus());

        } else if (record1.getProjectStatus() != null && record2.getProjectStatus() == null) {
            alterMap.put("projectStatus", null);

        } else if (record1.getProjectStatus() != null && record2.getProjectStatus() != null
                && !record1.getProjectStatus().equals(record2.getProjectStatus())) {
            alterMap.put("projectStatus", record2.getProjectStatus());

        }
        if (record1.getClient() == null && record2.getClient() != null) {
            alterMap.put("client", record2.getClient());

        } else if (record1.getClient() != null && record2.getClient() == null) {
            alterMap.put("client", null);

        } else if (record1.getClient() != null && record2.getClient() != null && !record1.getClient().equals(record2.getClient())) {
            alterMap.put("client", record2.getClient());

        }
        Integer count = alterMap.size();
        if (count >= 1) {
            alterMap.put("batchNo", record2.getBatch());
            alterMap.put("project", record2.getProject());
            alterMap.put("isChanged", true);
        }
        return alterMap;
    }

    private Map<String, Object> newProjectHistoryRecord(ProjectHistory record) {
        Map<String, Object> newMap = new HashMap<>();
        newMap.put("title", record.getTitle());
        newMap.put("description", record.getTitle());
        newMap.put("reason", record.getTitle());
        newMap.put("accountManager", record.getAccountManager());
        newMap.put("projectType", record.getProjectType());
        newMap.put("projectStatus", record.getProjectStatus());
        newMap.put("client", record.getClient());
        newMap.put("batchNo", record.getBatch());
        newMap.put("project", record.getProject());
        newMap.put("isChanged", false);
        return newMap;
    }

}
