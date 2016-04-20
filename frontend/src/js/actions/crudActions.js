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
    var messageConstant = require('../constants/messageConstant');
    var urlConstant = require('../constants/urlConstant');

    /**
     * Actions that are dispatched from crudActions
     */
    var actions = {
        list: function (entity, data) {
            return {
                type: actionTypeConstant.LIST,
                entity: entity,
                data: data
            }
        },

            delete: function (entity, id) {
            return {
                type: actionTypeConstant.DELETE,
                entity: entity,
                id: id
            }
        },

        selectItem: function (entity, data) {
            return {
                type: actionTypeConstant.SELECT_ITEM,
                entity: entity,
                data: data
            }
        },
        pageIndex: function (data, count) {
            return {
                type: actionTypeConstant.PAGINATION_INDEX,
                index: data._start,
                count: count
            }
        }
    };

    /**
     * These are the actions every CRUD in the application uses.
     *
     * Everytime an action that requires the API is called, it first Dispatches an "apiRequest" action.
     *
     * ApiUtil returns a promise which dispatches another action "apiResponse" on success and "apiError" on error.
     *
     * entity = 'budgetTypes', 'projectTypes', 'projectStatus', 'projects', ...
     */

    var crudActions = {
        fetchAllFromCore: function (entity) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchAllFromCore(entity).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.fetchAllFromCore(entity));
                    }
                }));
            }
        },

        fetchAll: function (entity) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchAll(entity).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.fetchAll(entity));
                    }
                }));
            }
        },

        addItem: function (entity, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.create(entity, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        Toastr.success(messageConstant.SUCCESSFULLY_ADDED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.addItem(entity, data));
                    }
                }));
            }
        },

        updateItem: function (entity, data, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.edit(entity, data, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        Toastr.success(messageConstant.SUCCESSFULLY_UPDATED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.updateItem(entity, data, id));
                    }
                }));
            }
        },

        fetchById: function (entity, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchById(entity, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.selectItem(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.fetchById(entity, id));
                    }
                }))
            }
        },

        deleteItem: function (entity, id, pagination, sortBy) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.delete(entity, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        Toastr.success(messageConstant.SUCCESSFULLY_DELETED);
                        dispatch(crudActions.fetchByQuery(entity, pagination, sortBy));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.deleteItem(entity, id, pagination, sortBy));
                    }
                }))
            }
        },

        updateSelectedItem: function (entity, key, value) {
            return {
                type: actionTypeConstant.UPDATE_SELECTED_ITEM,
                entity: entity,
                key: key,
                value: value
            }
        },

        handleSelectOptionChange: function (entity, key, value) {
            return {
                type: actionTypeConstant.HANDLE_SELECT_OPTION_CHANGE,
                entity: entity,
                key: key,
                value: value
            }
        },

        fetchByQuery: function (entity, data, sortBy) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (apiUtil.fetchByQuery2(entity, data, sortBy).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.pageIndex(data, response.body.count));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.fetchByQuery(entity, data, sortBy));
                    }
                }));
            }
        },

        clearSelectedItem: function (entity) {
            return {
                type: actionTypeConstant.CLEAR_SELECTED_ITEM,
                entity: entity
            }
        },

        clearPagination: function () {
            return {
                type: actionTypeConstant.PAGINATION_INDEX
            }
        },

        clearList: function (entity) {
            return {
                type: actionTypeConstant.CLEAR_LIST,
                entity: entity
            }
        },

        handleAutoCompleteChange: function (entity, key, id, label) {
            return {
                type: actionTypeConstant.HANDLE_AUTOCOMPLETE_CHANGE,
                entity: entity,
                key: key,
                id: id,
                label: label
            }
        }
    };

    module.exports = crudActions;

})();