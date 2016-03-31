;(function () {
    var actionTypeConstant = {
        LIST: 'LIST',
        DELETE: 'DELETE',
        ERROR: 'ERROR',
        ADD: 'ADD',
        UPDATE: 'UPDATE',
        SELECT_ITEM: 'SELECT_ITEM',
        UPDATE_SELECTED_ITEM: 'UPDATE_SELECTED_ITEM',
        PAGINATION_INDEX: 'PAGINATION_INDEX',
        CLEAR_SELECTED_ITEM: 'CLEAR_SELECTED_ITEM',

        //Contract Actions
        ADD_CONTRACT: 'ADD_CONTRACT',
        HANDLE_CONTRACT_CHANGE: 'HANDLE_CONTRACT_CHANGE',

        //Contract Member Actions
        ADD_CONTRACT_MEMBER: 'ADD_CONTRACT_MEMBER',

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
        API_CLEAR_STATE: 'API_CLEAR_STATE'
    };

    module.exports = actionTypeConstant;
})();