    ;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //actions
    var apiActions = require('./apiActions');

    //API utility
    var apiUtil = require('../util/apiUtil');
    var actionUtil = require('../util/actionUtil');

    var actions = {
        listByDate: function (projectType, data) {
            return {
                type: actionTypeConstant.LIST_BY_DATE,
                projectType: projectType,
                data: data
            }
        },

        listByStatus: function (data) {
            return {
                type: actionTypeConstant.LIST_PROJECT_BY_STATUS,
                data: data
            }
        },

        showResources: function (entity, resourceType, data) {
            return {
                type: actionTypeConstant.SHOW_RESOURCES,
                entity: entity,
                resourceType: resourceType,
                data: data
            }
        }
    };
    var dashboardActions = {
        fetchByField: function (entity, field, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchByField(entity, field, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.listByStatus(response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, dashboardActions.fetchByField(entity, field, data));
                    }
                }));
            }
        },

        fetchOverdueProjects: function (entity, type) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchByType(entity, type).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.listByDate(type, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, dashboardActions.fetchOverdueProjects(entity, type));
                    }
                }));
            }
        },

        fetchByEndDate: function (entity, projectType, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchByEndDate(entity, projectType, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.listByDate(projectType, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, dashboardActions.fetchByEndDate(entity, projectType, data));
                    }
                }));
            }
        },

        fetchResourceCount: function (entity, type) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchResourceCount(entity, type).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.showResources(entity, type, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, dashboardActions.fetchResourceCount(entity, type));
                    }
                }));
            }
        },

    };
    module.exports = dashboardActions;

})();