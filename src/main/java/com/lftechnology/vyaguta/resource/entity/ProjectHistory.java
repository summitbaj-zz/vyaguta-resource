package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeSerializer;
import com.lftechnology.vyaguta.commons.jpautil.UserConverter;
import com.lftechnology.vyaguta.commons.jpautil.UserDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.UserSerializer;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.jpautil.EmployeeConverter;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "project_histories")
public class ProjectHistory implements Serializable {

    private static final long serialVersionUID = -7863749153287317821L;

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @Column(name = "batch_no")
    private String batch;

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    private String description;

    @ManyToOne
    @JoinColumn(name = "project_type_id", referencedColumnName = "id")
    private ProjectType projectType;

    @ManyToOne
    @JoinColumn(name = "budget_type_id", referencedColumnName = "id")
    private BudgetType budgetType;

    @ManyToOne
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    private ProjectStatus projectStatus;

    @Column(name = "start_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;

    @Column(name = "end_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate endDate;

    @Column(name = "account_manager")
    @Convert(converter = EmployeeConverter.class)
    private Employee accountManager;

    private String reason;

    @Column(name = "created_by")
    @Convert(converter = UserConverter.class)
    @JsonDeserialize(using = UserDeserializer.class)
    @JsonSerialize(using = UserSerializer.class)
    private User createdBy;

    @Column(name = "created_at")
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
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

    public ProjectType getProjectType() {
        return projectType;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public BudgetType getBudgetType() {
        return budgetType;
    }

    public void setBudgetType(BudgetType budgetType) {
        this.budgetType = budgetType;
    }

    public ProjectStatus getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(ProjectStatus projectStatus) {
        this.projectStatus = projectStatus;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Employee getAccountManager() {
        return accountManager;
    }

    public void setAccountManager(Employee accountManager) {
        this.accountManager = accountManager;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
