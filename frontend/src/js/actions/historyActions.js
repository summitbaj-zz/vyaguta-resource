;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //API utility
    var apiUtil = require('../util/apiUtil');
    var actionUtil = require('../util/actionUtil');

    //actions
    var apiActions = require('./apiActions');

    //constants
    var urlConstant = require('../constants/urlConstant');

    var actions = {
        list: function (entity, data) {
            return {
                type: actionTypeConstant.LIST_HISTORY,
                entity: entity,
                data: data
            }
        }
    }

    var historyActions = {
        fetchAllHistories: function (entity, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchAllHistories(entity, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, historyActions.fetchAllHistories(entity, id));
                    }
                }));
            }
        },
        clearHistory: function (entity) {
            return {
                type: actionTypeConstant.CLEAR_HISTORY
            }
        }
    }
    module.exports = historyActions;

})();