;(function () {
    var actionTypeConstant = {
        LIST : 'LIST',
        DELETE : 'DELETE',
        ERROR: 'ERROR',
        ADD: 'ADD',
        EDIT: 'EDIT',

        //create project actions
        ADD_TEAM_MEMBER: 'ADD_TEAM_MEMBER',
        DELETE_TEAM_MEMBER: 'DELETE_TEAM_MEMBER',
        EDIT_TEAM_MEMBER: 'EDIT_TEAM_MEMBER',
        CLEAR_MEMBER_INDEX: 'CLEAR_MEMBER_INDEX',
        EDIT_TEAM_MEMBER_INDEX_IN_MODAL: 'EDIT_TEAM_MEMBER_INDEX_IN_MODAL'
    };

    module.exports = actionTypeConstant;
})();