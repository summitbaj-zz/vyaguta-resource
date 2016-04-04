package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectRoleSort extends CommonSort<ProjectRole> {

    public ProjectRoleSort() {
        sortBy("title");
    }
}
