package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Column;
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
@Table(name = "project_status")
public class ProjectStatus extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -7761707754863881913L;

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @Size(max = 7, min = 4, message = "Enter color code in hex format")
    @Column(name = "color_code")
    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @PrePersist
    public void prePersists() {
        this.setTitle(this.getTitle().trim());
        this.setColor(this.getColor().trim());
    }

    @PreUpdate
    public void preUpdates() {
        this.setTitle(this.getTitle().trim());
        this.setColor(this.getColor().trim());
    }
}
