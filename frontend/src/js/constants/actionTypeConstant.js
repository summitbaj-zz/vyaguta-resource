;(function () {
    var actionTypeConstant = {
        LIST: 'LIST',
        DELETE: 'DELETE',
        ERROR: 'ERROR',
        ADD: 'ADD',
        UPDATE: 'UPDATE',
        SELECT_ITEM: 'SELECT_ITEM',
        UPDATE_SELECTED_ITEM: 'UPDATE_SELECTED_ITEM',

        //Team Member actions
        ADD_TEAM_MEMBER: 'ADD_TEAM_MEMBER',
        DELETE_TEAM_MEMBER: 'DELETE_TEAM_MEMBER',
        EDIT_TEAM_MEMBER: 'EDIT_TEAM_MEMBER',
        CLEAR_MEMBER_INDEX: 'CLEAR_MEMBER_INDEX',
        CLEAR_MEMBER_STATE: 'CLEAR_MEMBER_STATE',
        EDIT_TEAM_MEMBER_INDEX_IN_MODAL: 'EDIT_TEAM_MEMBER_INDEX_IN_MODAL',

        //API actions
        API_REQUEST: 'API_REQUEST',
        API_RESPONSE: 'API_RESPONSE',
        API_ERROR: 'API_ERROR'

    };

    module.exports = actionTypeConstant;
})();