package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.common.CommonConstant;
import com.lftechnology.vyaguta.resource.entity.ProjectStatus;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectStatusFilter extends CommonFilter<ProjectStatus>implements Filterable<ProjectStatus> {

    public ProjectStatusFilter() {
        findByField(CommonConstant.TITLE);
        searchByField("q", CommonConstant.TITLE);
    }

}
