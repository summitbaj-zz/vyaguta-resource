;(function () {
    'use strict';

    var store = require('../store');
    var ApiUtil = require('../util/ApiUtil');
    var actionTypeConstant = require('../constants/actionTypeConstant');

    var _ = require('lodash');
    var Toastr = require('toastr');

    var crudActions = {
        fetchAll: function (entity) {
            var dispatchListIntoStore = function (response) {
                return (
                    store.dispatch({
                        type: actionTypeConstant.LIST,
                        data: response,
                        entity: entity
                    })
                );
            }
            ApiUtil.fetchAll(entity, dispatchListIntoStore);

        },

        deleteItem: function (entity, id, data) {

            var deleteItemFromStore = function (id) {
                var index = _.indexOf(data, _.find(data, {id: id}));
                data.splice(index, 1);

                Toastr.success('Project Status Successfully Deleted');

                return (
                    store.dispatch({
                        type: actionTypeConstant.DELETE,
                        data: data,
                        entity: entity
                    })
                );
            }
            ApiUtil.delete(entity, id, deleteItemFromStore);
        }
    }

    module.exports = crudActions;

})();