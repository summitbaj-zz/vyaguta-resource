package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;
import com.lftechnology.vyaguta.resource.pojo.Employee;

/**
 * 
 * @author Prajjwal Raj Kandel<prajjwalkandel@lftechnology.com>
 *
 */

@Table(name = "operational_resources")
@Entity
public class OperationalResource extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 2173510009809546297L;
    
    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "employee_id") ))
    private Employee employee;

    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((employeeId == null) ? 0 : employeeId.hashCode());
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
        OperationalResource other = (OperationalResource) obj;
        if (employeeId == null) {
            if (other.employeeId != null)
                return false;
        } else if (!employeeId.equals(other.employeeId))
            return false;
        return true;
    }
    
}
