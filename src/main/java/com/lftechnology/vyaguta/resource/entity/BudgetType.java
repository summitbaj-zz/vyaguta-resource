package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Table(name = "budget_types")
@Entity
public class BudgetType extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -3510694911514582414L;

    @NotBlank(message = "Title cannot be blank.")
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
}
