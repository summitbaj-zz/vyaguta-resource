package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "tags")
@NamedQuery(name = "Tags.SearchbyTitle", query = "SELECT t FROM Tag t WHERE UPPER(t.title) LIKE :title")
public class Tag extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -6816451300075198342L;

    @NotNull(message = "Title cannot be blank.")
    private String title;

    @ManyToMany(mappedBy = "tag")
    private Set<Project> project;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Project> getProjects() {
        return project;
    }

    public void setProjects(Set<Project> projects) {
        this.project = projects;
    }
}
