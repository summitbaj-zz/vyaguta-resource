package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "project_types")
public class ProjectType extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 832909736494541803L;

    @NotBlank(message = "Title cannot be blank.")
    @Size(max = 255)
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @PrePersist
    public void prePersists() {
        this.setTitle(this.getTitle().trim());
    }

    @PreUpdate
    public void preUpdates() {
        this.setTitle(this.getTitle().trim());
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!super.equals(obj)) {
            return false;
        }
        if (!(obj instanceof ProjectType)) {
            return false;
        }
        ProjectType other = (ProjectType) obj;
        if (title == null) {
            if (other.title != null) {
                return false;
            }
        } else if (!title.equals(other.title)) {
            return false;
        }
        return true;
    }

}
