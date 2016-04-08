package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.NotBlank;

import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Entity
@Table(name = "project_histories")
@NamedQueries({ @NamedQuery(name = ProjectHistory.FIND_BY_PROJECT, query = "SELECT ph FROM ProjectHistory ph WHERE ph.project = :project") })
public class ProjectHistory implements Serializable {

    private static final long serialVersionUID = -7863749153287317821L;
    private static final String PREFIX = "vyaguta.resource.entity.ProjectHistory.";
    public static final String FIND_BY_PROJECT = ProjectHistory.PREFIX + "findByProject";

    @Id
    @Type(type = "pg-uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "id")
    private ProjectHistoryRoot batch;

    @Column(name = "event_type")
    private Integer event;

    @NotBlank(message = "Title cannot be blank.")
    @Size(max = 255)
    private String title;

    private String description;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "account_manager_id")))
    private Employee accountManager;

    @ManyToOne
    @JoinColumn(name = "project_type_id", referencedColumnName = "id")
    private ProjectType projectType;

    @ManyToOne
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    private ProjectStatus projectStatus;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    public ProjectHistory() {
        super();
    }

    public ProjectHistory(Project project) {
        this.setProject(project);
        this.setTitle(project.getTitle());
        this.setDescription(project.getDescription());
        this.setAccountManager(project.getAccountManager());
        this.setClient(project.getClient());
        this.setProjectStatus(project.getProjectStatus());
        this.setProjectType(project.getProjectType());
    }

    @Transient
    private boolean isChanged;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectHistoryRoot getBatch() {
        return batch;
    }

    public Integer getEvent() {
        return event;
    }

    public void setEvent(Integer event) {
        this.event = event;
    }

    public void setBatch(ProjectHistoryRoot batch) {
        this.batch = batch;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employee getAccountManager() {
        return accountManager;
    }

    public void setAccountManager(Employee accountManager) {
        this.accountManager = accountManager;
    }

    public ProjectType getProjectType() {
        return projectType;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public ProjectStatus getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(ProjectStatus projectStatus) {
        this.projectStatus = projectStatus;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProjectHistory other = (ProjectHistory) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @PrePersist
    public void prePersist() {
        this.setId(GuidUtil.generate());
    }

}
