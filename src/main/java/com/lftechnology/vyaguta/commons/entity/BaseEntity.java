package com.lftechnology.vyaguta.commons.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.vyaguta.commons.jpautil.GuidUtil;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.LocalDateTimeSerializer;
import com.lftechnology.vyaguta.commons.jpautil.UserDeserializer;
import com.lftechnology.vyaguta.commons.jpautil.UserSerializer;
import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author anish manandhar<anishmanandhar@lftechnology.com>
 *
 */
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    private String id;

    @Column(name = "created_by")
    @JsonDeserialize(using = UserDeserializer.class)
    @JsonSerialize(using = UserSerializer.class)
    private User createdBy;

    @Column(name = "updated_by")
    @JsonDeserialize(using = UserDeserializer.class)
    @JsonSerialize(using = UserSerializer.class)
    private User updatedBy;

    @Column(name = "created_at")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PrePersist
    public void prePersist() {
        this.setId(GuidUtil.generate());
        this.setCreatedAt(LocalDateTime.now());
        this.setUpdatedAt(null);
        this.setUpdatedBy(null);
        User user = new User();
        user.setId("1");
        this.setCreatedBy(user);
    }

    @PreUpdate
    public void preUpdate() {
        this.setUpdatedAt(LocalDateTime.now());
    }
}
