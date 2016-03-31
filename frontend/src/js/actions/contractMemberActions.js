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
        }
    }

    module.exports = contractMemberAction;
})();