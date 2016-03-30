/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */

;(function () {

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');

    var initialState = {
        contracts: []
    };

    var contractReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.ADD_CONTRACT:
                var newState = _.cloneDeep(state);

                var emptyObject = {
                    budgetType: {},
                    startDate: {},
                    endDate: {},
                    resource: {},
                    teamMembers: {}
                }

                newState.contracts.push(emptyObject);
                return newState;

            default:
                return state;
        }
    }


    module.exports = contractReducer;

})();