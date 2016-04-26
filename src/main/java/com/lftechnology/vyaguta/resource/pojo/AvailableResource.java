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

}
