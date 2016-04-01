package com.lftechnology.vyaguta.resource.pojo;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Embeddable;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Embeddable
public class Employee implements Serializable {

    private static final long serialVersionUID = 1584639393971035213L;

    @Type(type = "pg-uuid")
    private UUID id;

    @Transient
    private String firstName;

    @Transient
    private String lastName;

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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

}
