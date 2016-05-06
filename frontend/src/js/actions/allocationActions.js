/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/1/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    /**
     * Contract CRUD actions inside of Create Project
     */

    var allocationActions = {
        addAllocation: function() {
            return {
                type: actionTypeConstant.ADD_ALLOCATION
            }
        },

        listAllocations: function(allocations) {
            return {
                type: actionTypeConstant.LIST_ALLOCATIONS,
                allocations: allocations
            }
        },

        handleAllocationSelectOptionChange: function(index, key, value) {
            return {
                type: actionTypeConstant.HANDLE_ALLOCATION_SELECT_OPTION_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        handleAllocationInputChange: function(index, key, value) {
            return {
                type: actionTypeConstant.HANDLE_ALLOCATION_INPUT_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        deleteAllocation: function(index) {
            return {
                type: actionTypeConstant.DELETE_ALLOCATION,
                index: index
            }
        },

        clearAllocations: function() {
            return {
                type: actionTypeConstant.CLEAR_ALLOCATIONS
            }
        }
    }

    module.exports = allocationActions;

})();