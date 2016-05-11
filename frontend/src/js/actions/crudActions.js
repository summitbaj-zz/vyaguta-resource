/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstants = require('../constants/actionTypeConstants');
    var messageConstants = require('../constants/messageConstants');
    var urlConstants = require('../constants/urlConstants');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //services
    var actionService = require('../services/actionService');

    //utils
    var converter = require('../utils/converter');

    //actions
    var apiActions = require('./apiActions');

    //services
    var resourceApiService = require('../services/api-services/resourceApiService');

    /**
     * Actions that are dispatched from crudActions
     */
    var actions = {
        list: function (entity, data) {
            return {
                type: actionTypeConstants.LIST,
                entity: entity,
                data: data
            }
        },

        delete: function (entity, id) {
            return {
                type: actionTypeConstants.DELETE,
                entity: entity,
                id: id
            }
        },

        selectItem: function (entity, data) {
            return {
                type: actionTypeConstants.SELECT_ITEM,
                entity: entity,
                data: data
            }
        },
        pageIndex: function (data, count) {
            return {
                type: actionTypeConstants.PAGINATION_INDEX,
                index: data.start,
                count: count
            }
        }
    };

    /**
     * These are the actions every CRUD in the application uses.
     *
     * Everytime an action that requires the API is called, it first Dispatches an "apiRequest" action.
     *
     * ApiService returns a promise which dispatches another action "apiResponse".
     *
     * entity = 'budgetTypes', 'projectTypes', 'projectStatus', 'projects', ...
     */

    var crudActions = {

        fetch: function (entity, pathParams, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());
                return (resourceApiService.fetch(pathParams, data).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        data && dispatch(actions.pageIndex(data, response.body.count));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, crudActions.fetch(entity, pathParams, data));
                    }
                }));
            }
        },

        addItem: function (entity, data) {
            console.log(data)
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.create(entity, data).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstants.SUCCESSFULLY_ADDED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, crudActions.addItem(entity, data));
                    }
                }));
            }
        },

        updateItem: function (entity, data, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (resourceApiService.edit(entity, data, id).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstants.SUCCESSFULLY_UPDATED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, crudActions.updateItem(entity, data, id));
                    }
                }));
            }
        },

        fetchById: function (entity, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.fetch(converter.getPathParam(entity, id)).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.selectItem(entity, response.body));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, crudActions.fetchById(entity, id));
                    }
                }))
            }
        },

        deleteItem: function (entity, id, data, count) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.delete(entity, id).then(function (response) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstants.SUCCESSFULLY_DELETED);

                        if (!(count % 10 != 1 || count == 1))
                            data.start = data.start - 10;
                        dispatch(crudActions.fetch(entity, data));
                    }
                }, function (error) {
                    if (actionService.isSameRoute(getState, oldRoute)) {
                        actionService.responseError(dispatch, error, entity, crudActions.deleteItem(entity, id, data));
                    }
                }))
            }
        },

        submitForm: function (entity, data, id) {
            return function (dispatch, getState) {
                if (id) {
                    dispatch(crudActions.updateItem(entity, data, id));
                } else {
                    dispatch(crudActions.addItem(entity, data));
                }
            }
        },

        updateSelectedItem: function (entity, key, value) {
            return {
                type: actionTypeConstants.UPDATE_SELECTED_ITEM,
                entity: entity,
                key: key,
                value: value
            }
        },

        handleSelectOptionChange: function (entity, key, value) {
            return {
                type: actionTypeConstants.HANDLE_SELECT_OPTION_CHANGE,
                entity: entity,
                key: key,
                value: value
            }
        },


        clearSelectedItem: function (entity) {
            return {
                type: actionTypeConstants.CLEAR_SELECTED_ITEM,
                entity: entity
            }
        },

        clearPagination: function () {
            return {
                type: actionTypeConstants.PAGINATION_INDEX
            }
        },

        clearList: function (entity) {
            return {
                type: actionTypeConstants.CLEAR_LIST,
                entity: entity
            }
        },

        handleAutoCompleteChange: function (entity, key, id, label) {
            return {
                type: actionTypeConstants.HANDLE_AUTOCOMPLETE_CHANGE,
                entity: entity,
                key: key,
                id: id,
                label: label
            }
        }
    };

    module.exports = crudActions;

})();