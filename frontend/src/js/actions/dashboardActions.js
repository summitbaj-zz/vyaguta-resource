;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    //actions
    var apiActions = require('./apiActions');

    //utils
    var converter = require('../utils/converter');

    //services
    var actionService = require('../services/actionService');
    var apiService = require('../services/api-services/resourceApiService');

    /**
     * Actions that are dispatched from dashboardActions
     */
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

    /**
     * These are the actions dashboard uses.
     *
     * Everytime an action that requires the API is called, it first Dispatches an "apiRequest" action.
     *
     * ApiService returns a promise which dispatches another action "apiResponse".
     *
     */

    var dashboardActions = {
        fetch: function (criteria, pathParam, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (apiService.fetch(pathParam, data).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.listByCriteria(criteria, response.body));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, dashboardActions.fetch(criteria, pathParam, data));
                    }
                }));
            }
        },

        fetchResourceCount: function (type, pathParam) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (apiService.fetch(pathParam).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.showResources(type, response.body));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, dashboardActions.fetchResourceCount(type, pathParam));
                    }
                }));
            }
        }
    };

    module.exports = dashboardActions;

})();