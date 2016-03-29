package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.entity.ProjectRole;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectRoleFilter extends CommonFilter<ProjectRole> {

    public ProjectRoleFilter() {
        findByField(CommonConstant.TITLE);
        searchByField("q", CommonConstant.TITLE);
    }
}
