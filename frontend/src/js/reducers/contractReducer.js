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
                    budgetType: null,
                    startDate: null,
                    endDate: null,
                    resource: null,
                    contractMembers: null
                }

                newState.contracts.push(emptyObject);
                return newState;

            case actionTypeConstant.HANDLE_CONTRACT_CHANGE:
                var newState = _.cloneDeep(state);
                newState.contracts[action.index][action.key] = action.value;
                return  newState;

            case actionTypeConstant.ADD_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                if(!newState.contracts[action.index].contractMembers) {
                    newState.contracts[action.index].contractMembers = [];
                }

                newState.contracts[action.index].contractMembers.push(action.data);
                return newState;

            default:
                return state;
        }
    }


    module.exports = contractReducer;

})();
