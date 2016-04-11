package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.SecurityRequestContext;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeAttributeConverter;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeSerializer;
import com.lftechnology.vyaguta.commons.jpautil.UserDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.UserSerializer;
import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 *
 */
@Entity
@Table(name = "project_history_root")
public class ProjectHistoryRoot implements Serializable {

    private static final long serialVersionUID = 1146094129268668576L;

    @Id
    @Type(type = "pg-uuid")
    private UUID id;

    private String reason;

    @AttributeOverrides(@AttributeOverride(name = "id", column = @Column(name = "created_by") ))
    @JsonDeserialize(using = UserDeserializer.class)
    @JsonSerialize(using = UserSerializer.class)
    private User createdBy;

    @Column(name = "created_at")
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProjectHistoryRoot other = (ProjectHistoryRoot) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @PrePersist
    public void prePersist() {
        this.setCreatedAt(LocalDateTime.now());
        this.setCreatedBy(SecurityRequestContext.getCurrentUser());
    }

    @Override
    public String toString() {
        return "ProjectHistoryRoot [id=" + id + ", reason=" + reason + ", createdBy=" + createdBy + ", createdAt="
                + createdAt + "]";
    }

}
