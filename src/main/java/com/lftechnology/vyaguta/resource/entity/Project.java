package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.entity.BaseEntity;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "projects")
public class Project extends BaseEntity implements Serializable {

  private static final long serialVersionUID = 6415143172601079320L;

  @NotNull(message = "Title cannot be blank.")
  private String title;

  private String description;

  @Column(name = "project_type_id")
  private String projectTypeId;

  @Column(name = "budget_type_id")
  private String budgetTypeId;

  @Column(name = "project_status_id")
  private String projectStatusId;

  @Column(name = "start_date")
  @JsonDeserialize(using = LocalDateDeserializer.class)
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate startDate;

  @Column(name = "end_date")
  @JsonDeserialize(using = LocalDateDeserializer.class)
  @JsonSerialize(using = LocalDateSerializer.class)
  private LocalDate endDate;

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

  public String getProjectTypeId() {
    return projectTypeId;
  }

  public void setProjectTypeId(String projectTypeId) {
    this.projectTypeId = projectTypeId;
  }

  public String getBudgetTypeId() {
    return budgetTypeId;
  }

  public void setBudgetTypeId(String budgetTypeId) {
    this.budgetTypeId = budgetTypeId;
  }

  public String getProjectStatusId() {
    return projectStatusId;
  }

  public void setProjectStatusId(String projectStatusId) {
    this.projectStatusId = projectStatusId;
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
}
