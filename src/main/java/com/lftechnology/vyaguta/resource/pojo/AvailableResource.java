package com.lftechnology.vyaguta.resource.pojo;

import java.util.UUID;

import org.hibernate.annotations.Type;

/**
 * POJO class holding information about employee and their allocation
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class AvailableResource {

    @Type(type = "pg-uuid")
    private UUID id;

    private String firstName;

    private String middleName;

    private String lastName;

    private Double availableAllocation = 1.0;

    private String designation;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getAvailableAllocation() {
        return availableAllocation;
    }

    public void setAvailableAllocation(Double allocation) {
        this.availableAllocation = allocation;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
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
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof AvailableResource)) {
            return false;
        }
        AvailableResource other = (AvailableResource) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

}
