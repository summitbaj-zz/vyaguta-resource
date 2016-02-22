/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/22/16.
 */
var ApiUtil = require('../util/ApiUtil');
var store = require('../store/store');
var _ = require('lodash');
var Toastr = require('toastr');

var budgetTypeAction = {
    deleteBudgetType: function (entity, id, data) {
        var deleteFromStore = function (id) {
            var index = _.indexOf(data, _.find(data, {id: id}));
            data.splice(index, 1);
            Toastr.success('Project Status Successfully Deleted');

            return (
                store.dispatch({
                    type: 'BUDGET_TYPE_DELETE',
                    data: data
                })
            );
        }

        ApiUtil.delete(entity, id, deleteFromStore);
    },

    fetchAllBudgetType: function (entity) {
        var dispatchListIntoStore = function (response) {
            return (
                store.dispatch({
                    type: 'BUDGET_TYPE_LIST',
                    data: response
                })
            );
        }
        ApiUtil.fetchAll(entity, dispatchListIntoStore);
    }
}

module.exports = budgetTypeAction;