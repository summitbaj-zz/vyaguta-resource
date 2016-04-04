package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.SecurityRequestContext;
import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeSerializer;
import com.lftechnology.vyaguta.commons.jpautil.UserDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.UserSerializer;
import com.lftechnology.vyaguta.commons.pojo.User;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Entity
@Table(name = "contract_member_histories")
public class ContractMemberHistory implements Serializable {

    private static final long serialVersionUID = 8270620804537730752L;

    @Id
    @Type(type = "pg-uuid")
    private UUID id;

    @Column(name = "batch_no")
    @Type(type = "pg-uuid")
    private UUID batch;

    @ManyToOne
    @JoinColumn(name = "contract_member_id", referencedColumnName = "id")
    private ContractMember contractMember;

    @ManyToOne
    @JoinColumn(name = "contract_id", referencedColumnName = "id")
    private Contract contract;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "employee_id") ))
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private ProjectRole projectRole;

    private float allocation;

    private boolean billed;

    @Column(name = "join_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate joinDate;

    @Column(name = "end_date")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate endDate;

    private String reason;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "created_by") ))
    @JsonDeserialize(using = UserDeserializer.class)
    @JsonSerialize(using = UserSerializer.class)
    private User createdBy;

    @Column(name = "created_at")
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdAt;

    public ContractMemberHistory() {
        super();
    }

    public ContractMemberHistory(ContractMember contractMember) {
        this.setContractMember(contractMember);
        this.setAllocation(contractMember.getAllocation());
        this.setBilled(contractMember.isBilled());
        this.setProjectRole(contractMember.getRole());
        this.setContract(contractMember.getContract());
        this.setEmployee(contractMember.getEmployee());
        this.setJoinDate(contractMember.getJoinDate());
        this.setEndDate(contractMember.getEndDate());
        this.setReason(contractMember.getReason());
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getBatch() {
        return batch;
    }

    public void setBatch(UUID batch) {
        this.batch = batch;
    }

    public ContractMember getContractMember() {
        return contractMember;
    }

    public void setContractMember(ContractMember contractMember) {
        this.contractMember = contractMember;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public ProjectRole getProjectRole() {
        return projectRole;
    }

    public void setProjectRole(ProjectRole projectRole) {
        this.projectRole = projectRole;
    }

    public float getAllocation() {
        return allocation;
    }

    public void setAllocation(float allocation) {
        this.allocation = allocation;
    }

    public boolean isBilled() {
        return billed;
    }

    public void setBilled(boolean billed) {
        this.billed = billed;
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
        ContractMemberHistory other = (ContractMemberHistory) obj;
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
        this.setCreatedAt(LocalDateTime.now());
        this.setCreatedBy(SecurityRequestContext.getCurrentUser());
    }

}
