package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToMany(mappedBy = "tag", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Project> project;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Project> getProject() {
        return project;
    }

    public void setProject(List<Project> project) {
        this.project = project;
    }

}
