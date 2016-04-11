package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lftechnology.vyaguta.commons.entity.BaseEntity;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "projects")
@NamedQueries({ @NamedQuery(name = Project.FIND_BY_CLIENT, query = "SELECT p FROM Project p WHERE p.client = :client") })
public class Project extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 6415143172601079320L;
    private static final String PREFIX = "vyaguta.resource.entity.Project.";
    public static final String FIND_BY_CLIENT = Project.PREFIX + "findByClient";

    @NotBlank(message = "Title cannot be blank.")
    @Size(max = 255)
    private String title;

    private String description;

    @ManyToOne
    @JoinColumn(name = "project_type_id", referencedColumnName = "id")
    private ProjectType projectType;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    private ProjectStatus projectStatus;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "account_manager_id")))
    private Employee accountManager;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "projects_tags", joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private List<Tag> tags = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "project", orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    @JsonManagedReference
    private List<Contract> contracts = new ArrayList<>();

    @Transient
    private String reason;

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

    public ProjectType getProjectType() {
        return projectType;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public Employee getAccountManager() {
        return accountManager;
    }

    public void setAccountManager(Employee accountManager) {
        this.accountManager = accountManager;
    }

    public ProjectStatus getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(ProjectStatus projectStatus) {
        this.projectStatus = projectStatus;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tag) {
        this.tags = tag;
    }

    public List<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        Project other = (Project) obj;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        return true;
    }

    @PrePersist
    public void prePersists() {
        this.setTitle(this.getTitle().trim());
    }

    @PreUpdate
    public void preUpdates() {
        this.setTitle(this.getTitle().trim());
    }
}
