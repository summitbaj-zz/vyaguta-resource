;(function () {
    'use strict';

    //Redux dependencies
    var store = require('../store/store');
    var apiActions = require('./apiActions');
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //API utility
    var ApiUtil = require('../util/ApiUtil');

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

        add: function () {

        },

        update: function () {

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
                    //errorActions.getError(error);
                    console.log('error');
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
                    //errorActions.getError(error);
                    console.log('error');
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
                    //errorActions.getError(error);
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
                    //errorActions.getError(error);
                    console.log(error);
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
                    //errorActions.getError(error);
                    console.log('error');
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