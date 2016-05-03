;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    //actions
    var apiActions = require('./apiActions');

    //utils
    var actionUtil = require('../util/actionUtil');
    var converter = require('../util/converter');

    //services
    var apiService = require('../services/api-services/resourceApiService');

    var actions = {
        listByCriteria: function (criteria, data) {
            return {
                type: actionTypeConstant.LIST_BY_CRITERIA,
                criteria: criteria,
                data: data
            }
        },

        showResources: function (resourceType, data) {
            return {
                type: actionTypeConstant.SHOW_RESOURCES,
                resourceType: resourceType,
                data: data
            }
        }
    };
    var dashboardActions = {
        fetch: function (criteria, pathParam, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());
                //apiService.fetch(entity, converter.serialize({field: data}));
                return (apiService.fetch(pathParam, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.listByCriteria(criteria, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, dashboardActions.fetch(criteria, pathParam, data));
                    }
                }));
            }
        },

        fetchResourceCount: function (type, pathParam) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());
                //apiService.fetch(entity, converter.serialize({field: data}));
                return (apiService.fetch(pathParam).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.showResources(type, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, dashboardActions.fetchResourceCount(type, pathParam));
                    }
                }));
            }
        }
    };

    module.exports = dashboardActions;

})();