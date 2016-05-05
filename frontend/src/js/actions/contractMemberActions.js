/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function() {

    'use strict';

    //constants
    var actionTypeConstants = require('../constants/actionTypeConstants');

    /**
     * CotractMember CRUD actions inside of Create Project
     */

    var contractMemberAction = {
        addContractMember: function(index, data) {
            return {
                type: actionTypeConstants.ADD_CONTRACT_MEMBER,
                index: index,
                data: data
            }
        },

        updateContractMember: function(contractIndex, memberIndex, data) {
            return {
                type: actionTypeConstants.UPDATE_CONTRACT_MEMBER,
                contractIndex: contractIndex,
                memberIndex: memberIndex,
                data: data
            }
        },

        initializeContractMember: function() {
            return {
                type: actionTypeConstants.INITIALIZE_CONTRACT_MEMBER
            }
        },

        selectContractMember: function(contractMember) {
            return {
                type: actionTypeConstants.SELECT_CONTRACT_MEMBER,
                contractMember: contractMember
            }
        },

        handleContractMemberSelectOptionChange: function(key, employeeId, employeeFullName) {
            return {
                type: actionTypeConstants.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE,
                key: key,
                employeeId: employeeId,
                employeeFullName: employeeFullName
            }
        },

        deleteContractMember: function(contractIndex, memberIndex) {
            return {
                type: actionTypeConstants.DELETE_CONTRACT_MEMBER,
                contractIndex: contractIndex,
                memberIndex: memberIndex
            }
        },

        clearContractMember: function() {
            return {
                type:actionTypeConstants.CLEAR_CONTRACT_MEMBER
            }
        }
    }

    module.exports = contractMemberAction;

})();