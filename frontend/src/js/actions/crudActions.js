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
                    if (entity == resourceConstant.PROJECTS) {
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
                    if (entity == resourceConstant.PROJECTS) {
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

        updateSelectedItem: function (key, value) {
            return {
                type: actionTypeConstant.UPDATE_SELECTED_ITEM,
                key: key,
                value: value
            }
        }
    }

    module.exports = crudActions;

})();