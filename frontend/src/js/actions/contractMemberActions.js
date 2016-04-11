/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function() {

    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    /**
     * CotractMember CRUD actions inside of Create Project
     */

    var contractMemberAction = {
        addContractMember: function(index, data) {
            return {
                type: actionTypeConstant.ADD_CONTRACT_MEMBER,
                index: index,
                data: data
            }
        },

        updateContractMember: function(contractIndex, memberIndex, data) {
            return {
                type: actionTypeConstant.UPDATE_CONTRACT_MEMBER,
                contractIndex: contractIndex,
                memberIndex: memberIndex,
                data: data
            }
        },

        initializeContractMember: function() {
            return {
                type: actionTypeConstant.INITIALIZE_CONTRACT_MEMBER
            }
        },

        selectContractMember: function(contractMember) {
            return {
                type: actionTypeConstant.SELECT_CONTRACT_MEMBER,
                contractMember: contractMember
            }
        },

        handleContractMemberSelectOptionChange: function(key, employeeId, employeeFullName) {
            return {
                type: actionTypeConstant.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE,
                key: key,
                employeeId: employeeId,
                employeeFullName: employeeFullName
            }
        },

        deleteContractMember: function(contractIndex, memberIndex) {
            return {
                type: actionTypeConstant.DELETE_CONTRACT_MEMBER,
                contractIndex: contractIndex,
                memberIndex: memberIndex
            }
        },

        clearContractMember: function() {
            return {
                type:actionTypeConstant.CLEAR_CONTRACT_MEMBER
            }
        }
    }

    module.exports = contractMemberAction;
})();