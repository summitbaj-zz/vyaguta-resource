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
        listByEndDate: function (entity, data) {
            return {
                type: actionTypeConstant.LIST_BY_END_DATE,
                data: data
            }
        },

        listByStatus: function (data) {
            return {
                type: actionTypeConstant.LIST_PROJECT_BY_STATUS,
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

        fetchByEndDate: function (entity, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchByEndDate(entity, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.listByEndDate(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, dashboardActions.fetchByEndDate(entity, data));
                    }
                }));
            }
        },
    };
    module.exports = dashboardActions;

})();