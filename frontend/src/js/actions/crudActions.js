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
    var ApiUtil = require('../util/apiUtil');

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
        },
        pageIndex: function(data, count){
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
        fetchAll: function (entity) {
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));

                return (ApiUtil.fetchAll(entity).then(function (response) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(actions.list(entity, response.body));
                }, function (error) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
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
                }, function (error) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
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
                }, function (error) {
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
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
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
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
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
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

        fetchByQuery: function(entity, data, sortBy){
            return function (dispatch){
                dispatch(apiActions.apiRequest(entity));
                return (ApiUtil.fetchByQuery2(entity, data, sortBy).then(function(response){
                    dispatch(apiActions.apiResponse(entity));
                    dispatch(actions.pageIndex(data, response.body.count));
                    dispatch(actions.list(entity, response.body));
                }, function(error){
                    dispatch(apiActions.apiResponse(entity));
                    Toastr.error(error.response.body.error);
                }));
            }
        },

        clearSelectedItem: function (entity) {
            return {
                type: actionTypeConstant.CLEAR_SELECTED_ITEM,
                entity: entity
            }
        },

        clearPagination: function(){
            return {
                type: actionTypeConstant.PAGINATION_INDEX
            }
        }
    };

    module.exports = crudActions;

})();