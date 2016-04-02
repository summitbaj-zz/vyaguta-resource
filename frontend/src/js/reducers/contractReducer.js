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
        contracts: [],
        allocations: [],
        selectedContractMember: {}
    };

    var contractReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.ADD_CONTRACT:
                var newState = _.cloneDeep(state);
                var emptyContractObject = {
                    budgetType: null,
                    startDate: null,
                    endDate: null,
                    resource: null,
                    contractMembers: null
                }
                newState.contracts.push(emptyContractObject);
                return newState;

            case actionTypeConstant.HANDLE_CONTRACT_CHANGE:
                var newState = _.cloneDeep(state);
                newState.contracts[action.index][action.key] = action.value;
                return newState;

            case actionTypeConstant.INITIALIZE_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                var emptyContractMemberObject = {
                    employee: null,
                    allocations: []
                };
                newState.selectedContractMember = emptyContractMemberObject;
                return newState;

            case actionTypeConstant.ADD_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                if (!newState.contracts[action.index].contractMembers) {
                    newState.contracts[action.index].contractMembers = [];
                }
                newState.contracts[action.index].contractMembers.push(action.data);
                return newState;

            case actionTypeConstant.UPDATE_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                newState.contracts[action.contractIndex].contractMembers[action.memberIndex] = action.data;
                return newState;

            case actionTypeConstant.ADD_ALLOCATION:
                var newState = _.cloneDeep(state);
                var emptyAllocationObject = {
                    role: null,
                    joinDate: null,
                    endDate: null,
                    allocation: null,
                    billed: false
                }
                newState.selectedContractMember.allocations.push(emptyAllocationObject);
                return newState;

            case actionTypeConstant.SELECT_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                newState.selectedContractMember = action.contractMember;
                return newState;

            case actionTypeConstant.CLEAR_CONTRACTS:
                var newState = _.cloneDeep(state);
                newState.contracts = [];
                return newState;

            case actionTypeConstant.CLEAR_CONTRACT_MEMBER:
                var newState = _.cloneDeep(state);
                newState.selectedContractMember = {};
                return newState;

            case actionTypeConstant.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE:
                var newState = _.cloneDeep(state);
                newState.selectedContractMember[action.key] = {id: action.value};
                return newState;

            case actionTypeConstant.HANDLE_ALLOCATION_SELECT_OPTION_CHANGE:
                var newState = _.cloneDeep(state);
                newState.selectedContractMember.allocations[action.index][action.key] = {id: action.value};
                return newState;

            case actionTypeConstant.HANDLE_ALLOCATION_INPUT_CHANGE:
                var newState = _.cloneDeep(state);
                newState.selectedContractMember.allocations[action.index][action.key] = action.value;
                return newState;

            default:
                return state;
        }
    }


    module.exports = contractReducer;

})();
