package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
  
  @NotNull(message = "Title field cannot be blank.")
  private String title;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
