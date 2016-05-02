/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    /**
     * Contract CRUD actions inside of Create Project
     */

    var contractActions = {
        addContract: function() {
            return {
                type: actionTypeConstant.ADD_CONTRACT
            }
        },

        handleContractChange: function(index, key, value) {
            return {
                type: actionTypeConstant.HANDLE_CONTRACT_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        handleContractSelectOptionChange: function(index, key, value) {
            return {
                type: actionTypeConstant.HANDLE_CONTRACT_SELECT_OPTION_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        deleteContract: function(index) {
            return {
                type: actionTypeConstant.DELETE_CONTRACT,
                index: index
            }
        },

        clearContracts: function() {
            return {
                type: actionTypeConstant.CLEAR_CONTRACTS
            }
        },

        clearContractsForView: function () {
            return {
                type: actionTypeConstant.CLEAR_CONTRACTS_FOR_VIEW
            }

        }


    }

    module.exports = contractActions;
})();