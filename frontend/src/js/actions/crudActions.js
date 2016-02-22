var store = require('../store');
var ApiUtil = require('../api-util/ApiUtil');
var actionTypeConstant = require('../constants/actionTypeConstant');

var _ = require('lodash');
var Toastr = require('toastr');

var crudActions = {
    getAll: function (entity) {
        var dispatchListIntoStore = function (response) {
            return (
                store.dispatch({
                    type: actionTypeConstant.LIST,
                    data: response
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
                    data: data
                })
        );
        }
        ApiUtil.delete(entity, id, deleteItemFromStore);
    }
}
module.exports = crudActions;
