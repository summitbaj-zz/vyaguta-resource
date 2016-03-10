/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    /**
     * TeamMember CRUD actions inside of Create Project
     */

    var teamMemberActions = {
        addTeamMember: function (teamMember) {
            return {
                type: actionTypeConstant.ADD_TEAM_MEMBER,
                data: teamMember
            }
        },

        deleteTeamMember: function (index) {
            return {
                type: actionTypeConstant.DELETE_TEAM_MEMBER,
                index: index
            }
        },

        editTeamMember: function (index, teamMember) {
            return {
                type: actionTypeConstant.EDIT_TEAM_MEMBER,
                index: index,
                data: teamMember
            }
        },

        editTeamMemberIndexInModal: function (index) {
            return {
                type: actionTypeConstant.EDIT_TEAM_MEMBER_INDEX_IN_MODAL,
                index: index
            }
        },

        clearMemberIndex: function () {
            return {
                type: actionTypeConstant.CLEAR_MEMBER_INDEX
            }
        },

        clearMemberState: function () {
            return {
                type: actionTypeConstant.CLEAR_MEMBER_STATE
            }

        }
    }

    module.exports = teamMemberActions;

})();
