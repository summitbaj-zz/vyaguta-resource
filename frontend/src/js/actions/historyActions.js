;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstants = require('../constants/actionTypeConstants');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //utils
    var converter = require('../utils/converter');

    //services
    var actionService = require('../services/actionService');
    var resourceApiService = require('../services/api-services/resourceApiService');

    //actions
    var apiActions = require('./apiActions');

    //constants
    var urlConstants = require('../constants/urlConstants');

    /**
     * Actions that are dispatched from historyActions
     */

    var actions = {
        list: function (entity, data) {
            return {
                type: actionTypeConstants.LIST_HISTORY,
                entity: entity,
                data: data
            }
        }
    }

    /**
     * These are the actions history uses.
     *
     * Everytime an action that requires the API is called, it first Dispatches an "apiRequest" action.
     *
     * ApiService returns a promise which dispatches another action "apiResponse".
     *
     */
    var historyActions = {
        fetchAllHistories: function (entity, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (resourceApiService.fetch(converter.getPathParam(entity, id, 'history')).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionService.responseError(dispatch, error, entity, historyActions.fetchAllHistories(entity, id));
                    }
                }));
            }
        },

        clearHistory: function (entity) {
            return {
                type: actionTypeConstants.CLEAR_HISTORY
            }
        }
    }

    module.exports = historyActions;

})();