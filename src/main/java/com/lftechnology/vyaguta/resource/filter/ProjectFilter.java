package com.lftechnology.vyaguta.resource.filter;

import com.lftechnology.vyaguta.commons.jpautil.CommonFilter;
import com.lftechnology.vyaguta.commons.jpautil.Filterable;
import com.lftechnology.vyaguta.resource.entity.Project;

public class ProjectFilter extends CommonFilter<Project>implements Filterable<Project> {
    public ProjectFilter() {
        filterByField("title");
        searchByField("title");
        // filterByStartDate();
        // filterByEndDate();
        filterByDateField("startDate");
        filterByDateField("endDate");
        filterByField("projectType", "title");
        filterByField("projectStatus", "title");
        filterByField("budgetType", "title");
    }

    // private void filterByStartDate() {
    // filterMap.put("startDate", new EntityFilter<Project>() {
    //
    // @Override
    // public Predicate filter(CriteriaMaker<Project> cm, String field, String
    // value) {
    // try {
    // if (value.startsWith("gte")) {
    // LocalDate startDate = LocalDate.parse(value.replaceFirst("gte", ""),
    // Constant.DATE_FORMAT_DB);
    // return
    // cm.getCriteriaBuilder().greaterThanOrEqualTo(cm.getRoot().get(field),
    // startDate);
    // } else if (value.startsWith("gt")) {
    // LocalDate startDate = LocalDate.parse(value.replaceFirst("gt", ""),
    // Constant.DATE_FORMAT_DB);
    // return cm.getCriteriaBuilder().greaterThan(cm.getRoot().get(field),
    // startDate);
    // } else {
    // LocalDate startDate = LocalDate.parse(value, Constant.DATE_FORMAT_DB);
    // return cm.getCriteriaBuilder().equal(cm.getRoot().get(field), startDate);
    // }
    // } catch (DateTimeParseException e) {
    // throw new ParameterFormatException("Start date format is invalid, should
    // be in yyyy-MM-dd format");
    // }
    // }
    // });
    // }
    //
    // private void filterByEndDate() {
    // filterMap.put("endDate", new EntityFilter<Project>() {
    //
    // @Override
    // public Predicate filter(CriteriaMaker<Project> cm, String field, String
    // value) {
    // try {
    // if (value.startsWith("lte")) {
    // LocalDate endDate = LocalDate.parse(value.replaceFirst("lte", ""),
    // Constant.DATE_FORMAT_DB);
    // return cm.getCriteriaBuilder().lessThanOrEqualTo(cm.getRoot().get(field),
    // endDate);
    // } else if (value.startsWith("lt")) {
    // LocalDate endDate = LocalDate.parse(value.replace("lt", ""),
    // Constant.DATE_FORMAT_DB);
    // return cm.getCriteriaBuilder().lessThan(cm.getRoot().get(field),
    // endDate);
    // } else {
    // LocalDate endDate = LocalDate.parse(value, Constant.DATE_FORMAT_DB);
    // return cm.getCriteriaBuilder().equal(cm.getRoot().get(field), endDate);
    // }
    // } catch (DateTimeParseException e) {
    // throw new ParameterFormatException("Start date format is invalid, should
    // be in yyyy-MM-dd format");
    // }
    // }
    // });
    // }
}
