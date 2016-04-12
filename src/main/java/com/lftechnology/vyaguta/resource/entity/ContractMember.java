package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.entity.BaseEntity;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateSerializer;
import com.lftechnology.vyaguta.commons.jpautil.SoftDeletable;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Entity
@Table(name = "contract_members")
@Where(clause = "deleted='false'")
@NamedQueries({ @NamedQuery(name = ContractMember.FIND_BY_CONTRACT,
        query = "SELECT cm FROM ContractMember cm WHERE cm.contract = :contract") })
public class ContractMember extends BaseEntity implements Serializable, SoftDeletable {

    private static final long serialVersionUID = -4463672032184656029L;
    private static final String PREFIX = "vyaguta.resource.entity.ContractMember.";
    public static final String FIND_BY_CONTRACT = ContractMember.PREFIX + "findByContract";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "contract_id", referencedColumnName = "id")
    @JsonBackReference
    private Contract contract;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "employee_id")))
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private ProjectRole role;

    @Column(name = "allocation")
    private float allocation;

    @Column(name = "billed")
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

    @Column(name = "deleted")
    private boolean deleted = false;

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

    public ProjectRole getRole() {
        return role;
    }

    public void setRole(ProjectRole role) {
        this.role = role;
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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + Float.floatToIntBits(allocation);
        result = prime * result + (billed ? 1231 : 1237);
        result = prime * result + ((endDate == null) ? 0 : endDate.hashCode());
        result = prime * result + ((joinDate == null) ? 0 : joinDate.hashCode());
        result = prime * result + ((role == null) ? 0 : role.hashCode());
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
        ContractMember other = (ContractMember) obj;
        if (Float.floatToIntBits(allocation) != Float.floatToIntBits(other.allocation))
            return false;
        if (billed != other.billed)
            return false;
        if (endDate == null) {
            if (other.endDate != null)
                return false;
        } else if (!endDate.equals(other.endDate))
            return false;
        if (joinDate == null) {
            if (other.joinDate != null)
                return false;
        } else if (!joinDate.equals(other.joinDate))
            return false;
        if (role == null) {
            if (other.role != null)
                return false;
        } else if (!role.equals(other.role))
            return false;
        return true;
    }

}
