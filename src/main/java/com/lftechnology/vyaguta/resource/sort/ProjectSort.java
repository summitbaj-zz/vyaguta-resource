package com.lftechnology.vyaguta.resource.sort;

import com.lftechnology.vyaguta.commons.jpautil.CommonSort;
import com.lftechnology.vyaguta.resource.entity.Project;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class ProjectSort extends CommonSort<Project> {

    public ProjectSort() {
        sortBy("title");
        sortBy("startDate");
        sortBy("endDate");
        sortBy("budgetType|title");
        sortBy("projectStatus|title");
        sortBy("projectType|title");
    }
}
