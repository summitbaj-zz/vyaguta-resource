package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
@Entity
@Table(name = "budget_types")
public class BudgetType extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -3510694911514582414L;

    @NotNull(message = "Title cannot be blank.")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
