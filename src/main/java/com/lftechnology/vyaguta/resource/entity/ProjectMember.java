package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.entity.BaseEntity;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;
import com.lftechnology.vyaguta.resource.jpautil.EmployeeConverter;
import com.lftechnology.vyaguta.resource.pojo.Employee;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "project_members")
@NamedQueries({
        @NamedQuery(name = ProjectMember.findByProject, query = "SELECT pm FROM ProjectMember pm WHERE pm.project = :project") })
@ApiModel(value = "ProjectMember", description = "ProjectMember resource representation")
public class ProjectMember extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -6628450706972838500L;
    private static final String PREFIX = "vyaguta.resource.entity.";
    public static final String findByProject = ProjectMember.PREFIX + "findByProject";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @ApiModelProperty(value = "Involved Project", required = true)
    @JsonBackReference
    private Project project;

    @ApiModelProperty(value = "Employee Id", required = true)
    @Convert(converter = EmployeeConverter.class)
    @Column(name = "employee")
    private Employee employee;

    @ApiModelProperty(value = "Project member's allocation to project", required = false)
    @Column(name = "allocation")
    private float allocation;

    @Column(name = "join_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @ApiModelProperty(value = "Date from which member is assigned to project", required = false)
    private LocalDate joinDate;

    @Column(name = "end_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @ApiModelProperty(value = "Date upto which member is assigned to project", required = false)
    private LocalDate endDate;

    // TODO change from private to Role and relational mapping
    @ApiModelProperty(value = "Member role to project", required = false)
    @Column(name = "role_id")
    private String role;

    @Column(name = "billed")
    @ApiModelProperty(value = "Billing type of member", required = false)
    private boolean billed;

    @Column(name = "active")
    @ApiModelProperty(value = "Current status of member", required = false)
    private boolean active;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public float getAllocation() {
        return allocation;
    }

    public void setAllocation(float allocation) {
        this.allocation = allocation;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isBilled() {
        return billed;
    }

    public void setBilled(boolean billed) {
        this.billed = billed;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
