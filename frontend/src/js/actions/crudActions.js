;(function () {
    'use strict';

    //Redux dependencies
    var store = require('../store/store');
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');
    var resourceConstant = require('../constants/resourceConstant');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //API utility
    var ApiUtil = require('../util/ApiUtil');

    //actions
    var apiActions = require('./apiActions');
    var teamMemberActions = require('./teamMemberActions');

    /**
     * These are the actions every CRUD in the application uses.
     * Thunk Middleware is used that allows return of functions from action creators instead of
     * just actions.
     * Everytime an action that requires the API is called, it first Dispatches an "apiRequest" action.
     * ApiUtil returns a promise. After getting the response, it Dispatches another
     * action "apiResponse" .
     * Here "entity" represents (budgetTypes, projectTypes, projects,etc..)
     *
     * @type {{list: actions.list}}
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
        }
    };

    var crudActions = {
        fetchAll: function (entity) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.fetchAll(entity).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    dispatch(actions.list(entity, response.body));
                }, function (error) {
                    dispatch(apiActions.apiError(error));
                }));
            }
        },

        addItem: function (entity, data) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.create(entity, data).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.success('Successfully added item');
                    browserHistory.goBack();

                    //clear Team Member state after saving project form
                    if(entity == resourceConstant.PROJECTS) {
                        dispatch(teamMemberActions.clearMemberState());
                    }
                }, function (error) {
                    dispatch(apiActions.apiError(error));
                }));
            }
        },

        updateItem: function (entity, data, id) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.edit(entity, data, id).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.success('Successfully updated item');
                    browserHistory.goBack();

                    //clear Team Member state after saving project form
                    if(entity == resourceConstant.PROJECTS) {
                        dispatch(teamMemberActions.clearMemberState());
                    }
                }, function (error) {
                    dispatch(apiActions.apiError(error));
                }))
            }
        },

        fetchById: function (entity, id) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.fetchById(entity, id).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    dispatch(actions.selectItem(entity, response.body));
                }, function (error) {
                    dispatch(apiActions.apiError(error));
                }))
            }
        },

        deleteItem: function (entity, id) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.delete(entity, id).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.success('Successfully deleted item');
                    dispatch(actions.delete(entity, id));
                }, function (error) {
                    dispatch(apiActions.apiError(error));
                }))
            }
        },

        updateSelectedItem: function(key, value) {
            return {
                type: actionTypeConstant.UPDATE_SELECTED_ITEM,
                key: key,
                value: value
            }
        }
    }

    module.exports = crudActions;

})();