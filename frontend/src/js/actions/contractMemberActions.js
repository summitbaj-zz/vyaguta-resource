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

        clearContractMember: function() {
            return {
                type:actionTypeConstant.CLEAR_CONTRACT_MEMBER
            }
        }
    }

    module.exports = contractMemberAction;
})();