package com.lftechnology.vyaguta.commons.pojo;

import java.io.Serializable;

import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class User implements Serializable {

    private static final long serialVersionUID = -7856101622623370097L;

    private String id;
    private String name;
    private String email;

    public User() {
    }

    public User(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return JsonToStringBuilder.toString(this);
    }
}
