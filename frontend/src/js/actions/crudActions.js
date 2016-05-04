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
    var actionTypeConstant = require('../constants/actionTypeConstants');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //utils
    var actionUtil = require('../util/actionUtil');
    var converter = require('../util/converter');

    //actions
    var apiActions = require('./apiActions');

    //services
    var resourceApiService = require('../services/api-services/resourceApiService');

    //constants
    var messageConstant = require('../constants/messageConstants');
    var urlConstant = require('../constants/urlConstants');

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
     * ApiUtil returns a promise which dispatches another action "apiResponse" on success and "apiError" on error.
     *
     * entity = 'budgetTypes', 'projectTypes', 'projectStatus', 'projects', ...
     */

    var crudActions = {

        fetch: function (entity, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());
                return (resourceApiService.fetch(entity, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        data && dispatch(actions.pageIndex(data, response.body.count));
                        dispatch(actions.list(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, crudActions.fetch(entity, data));
                    }
                }));
            }
        },

        addItem: function (entity, data) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.create(entity, data).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstant.SUCCESSFULLY_ADDED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, crudActions.addItem(entity, data));
                    }
                }));
            }
        },

        updateItem: function (entity, data, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest(entity));

                return (resourceApiService.edit(entity, data, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstant.SUCCESSFULLY_UPDATED);
                        browserHistory.goBack();
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, crudActions.updateItem(entity, data, id));
                    }
                }));
            }
        },

        fetchById: function (entity, id) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.fetch(converter.getPathParam(entity, id)).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        dispatch(actions.selectItem(entity, response.body));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        actionUtil.responseError(dispatch, error, crudActions.fetchById(entity, id));
                    }
                }))
            }
        },

        deleteItem: function (entity, id, data, count) {
            return function (dispatch, getState) {
                var oldRoute = getState().routing.locationBeforeTransitions.pathname;
                dispatch(apiActions.apiRequest());

                return (resourceApiService.delete(entity, id).then(function (response) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse());
                        Toastr.success(messageConstant.SUCCESSFULLY_DELETED);

                        if (!(count % 10 != 1 || count == 1))
                            data.start = data.start - 10;
                        console.log(data);
                        dispatch(crudActions.fetch(entity, data));
                    }
                }, function (error) {
                    if (actionUtil.isSameRoute(getState, oldRoute)) {
                        dispatch(apiActions.apiResponse(entity));
                        actionUtil.responseError(dispatch, error, entity, crudActions.deleteItem(entity, id, data));
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

        /* fetchByQuery: function (entity, data, sortBy) {
         return function (dispatch, getState) {
         var oldRoute = getState().routing.locationBeforeTransitions.pathname;
         dispatch(apiActions.apiRequest(entity));

         return (apiUtil.fetchBySortingQuery(entity, data, sortBy).then(function (response) {
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
         },*/
    };

    module.exports = crudActions;

})();