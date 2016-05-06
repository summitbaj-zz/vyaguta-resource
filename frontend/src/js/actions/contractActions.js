/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstants = require('../constants/actionTypeConstants');

    /**
     * Contract CRUD actions inside of Create Project
     */

    var contractActions = {
        addContract: function() {
            return {
                type: actionTypeConstants.ADD_CONTRACT
            }
        },

        handleContractChange: function(index, key, value) {
            return {
                type: actionTypeConstants.HANDLE_CONTRACT_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        handleContractSelectOptionChange: function(index, key, value) {
            return {
                type: actionTypeConstants.HANDLE_CONTRACT_SELECT_OPTION_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        deleteContract: function(index) {
            return {
                type: actionTypeConstants.DELETE_CONTRACT,
                index: index
            }
        },

        clearContracts: function() {
            return {
                type: actionTypeConstants.CLEAR_CONTRACTS
            }
        }
    }

    module.exports = contractActions;

})();