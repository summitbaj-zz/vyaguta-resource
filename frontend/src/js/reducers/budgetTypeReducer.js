/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/22/16.
 */
var Immutable = require('immutable');

var initialState = Immutable.Map({budgetTypes: [{title:"check", id:1}]});

var budgetTypeReducer = function (state, action) {
    state = state || initialState;

    switch (action.type) {
        case 'BUDGET_TYPE_LIST':
            return state.set('budgetTypes', action.data);

        case 'BUDGET_TYPE_DELETE':
            return state.set('budgetTypes', action.data);

        default:
            return state;
    }
}

module.exports = budgetTypeReducer;