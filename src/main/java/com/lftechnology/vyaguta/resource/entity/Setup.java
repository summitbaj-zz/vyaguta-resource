package com.lftechnology.vyaguta.resource.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.lftechnology.vyaguta.commons.entity.BaseEntity;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@Entity
@Table(name = "setups")
@NamedQueries({ @NamedQuery(name = Setup.GET_DEFAULT_ROLE, query = "SELECT s.role FROM Setup s") })
public class Setup extends BaseEntity implements Serializable {

    private static final String PREFIX = "vyaguta.resource.entity.";
    public static final String GET_DEFAULT_ROLE = PREFIX + "getDefaultRole";
    private static final long serialVersionUID = -3124425686504880395L;

    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
