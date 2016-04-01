/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/1/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    /**
     * Contract CRUD actions inside of Create Project
     */

    var allocationActions = {
        addAllocation: function() {
            return {
                type: actionTypeConstant.ADD_ALLOCATION
            }
        },

        handleAllocationChange: function(index, key, value) {
            return {
                type: actionTypeConstant.HANDLE_ALLOCATION_CHANGE,
                index: index,
                key: key,
                value: value
            }
        },

        clearAllocations: function() {
            return {
                type: actionTypeConstant.CLEAR_ALLOCATION
            }
        }

    }

    module.exports = allocationActions;
})();