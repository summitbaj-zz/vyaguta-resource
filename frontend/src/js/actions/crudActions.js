var store = require('../store');
var ApiUtil = require('../api-util/ApiUtil');
var _ = require('lodash');

var crudActions = {
    getAll: function (entity) {
        var dispatchListIntoStore = function (response) {
            return (
                store.dispatch({
                    type: 'SAMPLE',
                    data: response
                })
            );
        }
        ApiUtil.fetchAll(entity, dispatchListIntoStore);

    },
    deleteItem: function (entity, id, data) {
        //var deleteItemFromStore = function (id) {
        var index = _.indexOf(data, _.find(data, {id: id}));
        data.splice(index, 1);
        console.log(data);
        return (
                store.dispatch({
                    type: 'DELETE',
                    data: data
                })
            );
        //}
      //  ApiUtil.delete(entity, id, deleteItemFromStore);
    }
}
module.exports = crudActions;
