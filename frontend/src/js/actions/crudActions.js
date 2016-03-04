;(function () {
    'use strict';

    //Redux dependencies
    var store = require('../store/store');
    var apiActions = require('./apiActions');

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //API utility
    var ApiUtil = require('../util/ApiUtil');

    /*
     * These are the actions every CRUD in the application uses.
     * Thunk Middleware is used, which allows to return functions from action creators.
     */

    var crudActions = {
        fetchAll: function (entity) {

            return function (dispatch) {
                dispatch(apiActions.ApiRequest(entity));

                return (ApiUtil.fetchAll(entity).then(function (response) {
                   dispatch(apiActions.ApiResponse(response.body));

                }, function (error) {
                    //errorActions.getError(error);
                    console.log("error");
                }));
            }
        },

        deleteItem: function (entity, id, data) {

            var deleteItemFromStore = function (id) {
                Toastr.success('Project Status Successfully Deleted');

                return (
                    store.dispatch({
                        type: actionTypeConstant.DELETE,
                        id: id,
                        entity: entity
                    })
                );
            }
            ApiUtil.delete(entity, id, deleteItemFromStore);
        }
    }

    module.exports = crudActions;

})();