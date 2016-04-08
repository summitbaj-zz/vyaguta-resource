package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Entity
@Table(name = "contract_histories")
@NamedQueries({ @NamedQuery(name = ContractHistory.FIND_BY_PROJECT, query = "SELECT ch FROM ContractHistory ch WHERE ch.project = :project ORDER BY ch.batch.createdAt DESC") })
public class ContractHistory implements Serializable {

    private static final long serialVersionUID = -4315662140074205279L;
    private static final String PREFIX = "vyaguta.resource.entity.ContractHistory.";
    public static final String FIND_BY_PROJECT = ContractHistory.PREFIX + "findByProject";

    @Id
    @Type(type = "pg-uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "id")
    private ProjectHistoryRoot batch;

    @Column(name = "event_type")
    private Integer event;

    @ManyToOne
    @JoinColumn(name = "contract_id", referencedColumnName = "id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "budget_type_id", referencedColumnName = "id")
    private BudgetType budgetType;

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

    @Column(name = "actual_end_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate actualEndDate;

    private String resource;

    public ContractHistory() {
        super();
    }

    public ContractHistory(Contract contract) {
        this.setContract(contract);
        this.setActualEndDate(contract.getActualEndDate());
        this.setStartDate(contract.getStartDate());
        this.setEndDate(contract.getEndDate());
        this.setBudgetType(contract.getBudgetType());
        this.setProject(contract.getProject());
        this.setEvent(ProjectHistory.EVENT_TYPE_UPDATE);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ProjectHistoryRoot getBatch() {
        return batch;
    }

    public void setBatch(ProjectHistoryRoot batch) {
        this.batch = batch;
    }

    public Integer getEvent() {
        return event;
    }

    public void setEvent(Integer event) {
        this.event = event;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public BudgetType getBudgetType() {
        return budgetType;
    }

    public void setBudgetType(BudgetType budgetType) {
        this.budgetType = budgetType;
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

    public LocalDate getActualEndDate() {
        return actualEndDate;
    }

    public void setActualEndDate(LocalDate actualEndDate) {
        this.actualEndDate = actualEndDate;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
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
        ContractHistory other = (ContractHistory) obj;
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
