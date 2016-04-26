package com.lftechnology.vyaguta.resource.service.impl;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.lftechnology.vyaguta.commons.exception.DataAccessException;
import com.lftechnology.vyaguta.commons.exception.ObjectNotFoundException;
import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.commons.util.MultivaluedMap;
import com.lftechnology.vyaguta.commons.util.MultivaluedMapImpl;
import com.lftechnology.vyaguta.resource.dao.ContractMemberDao;
import com.lftechnology.vyaguta.resource.dao.ProjectDao;
import com.lftechnology.vyaguta.resource.dao.TagDao;
import com.lftechnology.vyaguta.resource.entity.Client;
import com.lftechnology.vyaguta.resource.entity.Contract;
import com.lftechnology.vyaguta.resource.entity.Project;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;
import com.lftechnology.vyaguta.resource.entity.ProjectType;
import com.lftechnology.vyaguta.resource.entity.Tag;
import com.lftechnology.vyaguta.resource.pojo.AvailableResource;
import com.lftechnology.vyaguta.resource.pojo.Employee;
import com.lftechnology.vyaguta.resource.pojo.Employee.Designation;
import com.lftechnology.vyaguta.resource.service.EmployeeService;
import com.lftechnology.vyaguta.resource.service.ProjectHistoryService;

public class ProjectServiceImplTest {

    @Mock
    private ProjectDao projectDao;

    @Mock
    private TagDao tagDao;

    @Mock
    private ProjectHistoryService projectHistoryService;

    @Mock
    private EmployeeService employeeService;

    @Mock
    private ContractMemberDao contactMemberDao;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @InjectMocks
    private ProjectServiceImpl projectServiceImpl;

    Project project;

    private UUID id = UUID.randomUUID();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        project = this.buildProject();
    }

    @Test
    public void testSaveWhenTagIdisNullAndTagTitleIsGiven() {

        // arrange
        Tag tag = this.buildTag(id, "java");
        List<Tag> tags = new ArrayList<>();
        tags.add(this.buildTag(null, "Maven"));
        project.setTags(tags);

        Mockito.when(tagDao.save(Mockito.anyObject())).thenReturn(tag);

        // act
        projectServiceImpl.save(project);

        // assert
        Mockito.verify(tagDao).save(Mockito.anyObject());
        Mockito.verify(tagDao, Mockito.never()).findById(UUID.randomUUID());
        Mockito.verify(projectDao).save(project);
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testSaveWhenTagTitleIsNotUnique() {

        // arrange
        List<Tag> tags = new ArrayList<>();
        Tag tag = buildTag(null, "Java");
        tags.add(tag);
        project.setTags(tags);
        Mockito.when(tagDao.save(tag)).thenThrow(DataAccessException.class);

        exception.expect(DataAccessException.class);

        // when
        projectServiceImpl.save(project);
    }

    @Test
    public void testUpdate() {

        // arrange
        Project project = this.buildProject();
        Mockito.when(projectDao.update(project)).thenReturn(project);
        Mockito.doNothing().when(projectHistoryService).logHistory(project);

        // act
        Project resultProject = this.projectServiceImpl.update(project);

        // assert
        Mockito.verify(projectDao).update(project);
        Mockito.verify(projectHistoryService).logHistory(project);
        assertThat(resultProject, is(project));
    }

    @Test
    public void testMergeWhenProjectIdIsNotValidAndWildflyExpectObjectNotFoundException() {

        // arrange
        Mockito.when(projectServiceImpl.findById(id)).thenReturn(null);

        exception.expect(ObjectNotFoundException.class);

        // act
        this.projectServiceImpl.merge(id, project);
    }

    @Test
    public void testMergeWhenReasonIsNullExpectParameterFormatException() {

        // arrange
        project.setReason(null);

        exception.expect(ParameterFormatException.class);

        // act
        this.projectServiceImpl.merge(id, project);
    }

    @Test
    public void testMergeWhenProjectIdIsValid() {

        // arrange
        Project projectOld = this.buildProject();
        projectOld.setTitle("Old title");
        Mockito.when(projectDao.findById(id)).thenReturn(projectOld);
        Mockito.when(projectDao.update(projectOld)).thenReturn(projectOld);

        // act
        Project resultProject = this.projectServiceImpl.merge(id, project);

        // assert
        assertThat(resultProject.getTitle(), is(projectOld.getTitle()));
        Mockito.verify(projectDao).update(projectOld);
        Mockito.verify(projectDao).findById(id);
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testRemoveByIdWhenProjectIdIsNotValidExpectNoObjectFoundException() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenThrow(ObjectNotFoundException.class);

        exception.expect(ObjectNotFoundException.class);

        // act
        this.projectServiceImpl.removeById(id);
    }

    @Test
    public void testRemoveByIdWhenIdIsValid() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenReturn(project);
        Mockito.doNothing().when(projectDao).remove(project);

        // act
        this.projectServiceImpl.removeById(id);

        // assert
        Mockito.verify(projectDao).findById(id);
        Mockito.verify(projectDao).remove(project);
    }

    @Test
    public void testFindById() {

        // arrange
        Mockito.when(projectDao.findById(id)).thenReturn(project);

        // act
        this.projectServiceImpl.findById(id);

        // assert
        Mockito.verify(projectDao).findById(id);
    }

    @SuppressWarnings("serial")
    @Test
    public void testFindByIdAndAccountManagerDetails() {

        // arrange
        Project project = this.buildProject();
        project.setAccountManager(buildEmployee("88399a07-ff53-4d65-8e91-793aaa582f2c"));

        Employee e1 = this.buildEmployee("88399a07-ff53-4d65-8e91-793aaa582f2c");
        e1.setFirstName("Ram");
        e1.setLastName("Sharma");
        e1.setDob(LocalDate.of(1992, 02, 02));
        Employee e2 = this.buildEmployee("88399a07-ff53-4d65-8e91-793aaa582111");
        e2.setFirstName("Hari");
        e2.setLastName("Shrestha");
        e2.setDob(LocalDate.of(1994, 03, 05));

        List<Employee> employees = new ArrayList<Employee>() {
            {
                add(e1);
                add(e2);
            }
        };

        List<UUID> employeeIds = new ArrayList<UUID>() {
            {
                add(UUID.fromString("88399a07-ff53-4d65-8e91-793aaa582f2c"));
            }
        };

        Mockito.when(employeeService.fetchEmployees(employeeIds)).thenReturn(employees);
        Mockito.when(projectDao.findById(id)).thenReturn(project);

        // act
        Project resultProject = this.projectServiceImpl.findById(id);

        // assert
        assertThat(resultProject.getAccountManager(), is(e1));
        assertThat(resultProject.getAccountManager(), is(not(e2)));
        Mockito.verify(projectDao).findById(id);
    }

    @Test
    public void testFindAll() {

        // arrange
        Mockito.when(projectDao.findAll()).thenReturn(new ArrayList<Project>());

        // act
        this.projectDao.findAll();

        // assert
        Mockito.verify(projectDao).findAll();
    }

    @Test
    public void testCount() {

        // arrange
        Mockito.when(projectDao.count(null)).thenReturn(10L);

        // act
        Long result = this.projectDao.count(null);

        // assert
        Mockito.verify(projectDao).count(null);
        assertThat(result, is(Long.valueOf(10)));
    }

    @Test
    public void testFind() {

        // arrange
        Mockito.when(projectDao.find(Matchers.anyInt(), Matchers.anyInt())).thenReturn(new ArrayList<Project>());

        // act
        this.projectServiceImpl.find(2, 20);

        // assert
        Mockito.verify(projectDao).find(Matchers.anyInt(), Matchers.anyInt());

    }

    @Test
    public void testFindByFilter() {

        // arrange
        Map<String, List<String>> multiValue = new HashMap<>();
        multiValue.put("title", Arrays.asList("AML"));
        MultivaluedMap<String, String> queryParameters = new MultivaluedMapImpl<>(multiValue);
        List<Project> tags = new ArrayList<>();
        tags.add(this.buildProject());

        Mockito.when(projectDao.findByFilter(queryParameters)).thenReturn(tags);
        Mockito.when(projectDao.count(queryParameters)).thenReturn(10L);

        // act
        Map<String, Object> result = this.projectServiceImpl.findByFilter(queryParameters);

        // assert
        assertTrue(result.containsKey("count"));
        assertTrue(result.containsValue(10L));
        assertTrue(result.containsKey("data"));
        assertTrue(result.containsValue(tags));
        Mockito.verify(projectDao).count(queryParameters);
        Mockito.verify(projectDao).findByFilter(queryParameters);
    }

    @Test
    public void testFindAvailableResourceAndAssertEmployeeAllocationTotalAsMax100() {

        // arrange
        List<Employee> employeeList = new ArrayList<>();
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeea"));
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeeb"));
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeec"));
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeed"));
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"));
        employeeList.add(this.buildEmployee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeef"));

        Map<UUID, Double> allocatedMembers = new HashMap<>();
        allocatedMembers.put(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeea"), 0.75);
        allocatedMembers.put(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeeb"), 1.0);
        allocatedMembers.put(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeed"), 1.25);
        allocatedMembers.put(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"), 0.5);
        allocatedMembers.put(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeef"), 0.0);

        Mockito.when(employeeService.fetchActiveEmployees()).thenReturn(employeeList);
        Mockito.when(contactMemberDao.findAvailableResource(LocalDate.now())).thenReturn(allocatedMembers);

        // act
        List<AvailableResource> availableResources = this.projectServiceImpl.findAvailableResource(LocalDate.now());

        // assert
        AvailableResource ar = new AvailableResource();

        ar.setId(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeea"));
        assertTrue(availableResources.contains(ar));

        ar.setId(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeed"));
        assertFalse(availableResources.contains(ar));

        ar.setId(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"));
        assertTrue(availableResources.get(3).getAvailableAllocation().equals(0.25));

        ar.setId(UUID.fromString("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeeb"));
        assertFalse(availableResources.contains(ar));
    }

    private Tag buildTag(UUID id, String title) {
        Tag tag = new Tag();
        tag.setId(id);
        tag.setTitle(title);
        return tag;
    }

    private Project buildProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setTitle("Vyaguta");
        project.setCreatedAt(LocalDateTime.now());
        project.setCreatedBy(new User(UUID.randomUUID()));
        project.setProjectType(buildProjectType());
        project.setProjectStatus(buildProjectStatus());
        project.setReason("This is reason");
        project.setContracts(this.buildContract());
        project.setClient(this.buildClients());
        return project;
    }

    private ProjectType buildProjectType() {
        ProjectType projectType = new ProjectType();
        projectType.setId(UUID.randomUUID());
        projectType.setTitle("project type");
        return projectType;
    }

    private ProjectStatus buildProjectStatus() {
        ProjectStatus projectStatus = new ProjectStatus();
        projectStatus.setId(UUID.randomUUID());
        projectStatus.setTitle("project status");
        return projectStatus;
    }

    private Client buildClients() {
        Client client = new Client();
        client.setName("Ram Sharma");
        client.setEmail("ram@lftechnology.com");
        return client;
    }

    private List<Contract> buildContract() {
        List<Contract> contracts = new ArrayList<>();
        Contract contract = new Contract();
        contract.setId(UUID.randomUUID());
        contract.setStartDate(LocalDate.now());
        contract.setEndDate(LocalDate.of(2020, 02, 02));
        contracts.add(contract);
        return contracts;
    }

    private Employee buildEmployee(String id) {
        Employee employee = new Employee();
        employee.setId(UUID.fromString(id));
        Designation designation = new Designation();
        designation.setTitle("Developer");
        employee.setDesignation(designation);
        return employee;
    }

}
