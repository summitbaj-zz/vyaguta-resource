/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */

;(function () {

    var urlConstant = {
        BASE_PATH: '',
        BUDGET_TYPES: {
            INDEX: '/budgettypes',
            NEW: '/budgettypes/new',
            EDIT: '/budgettypes/edit'
        },
        PROJECT_STATUS: {
            INDEX: '/projectstatus',
            NEW: '/projectstatus/new',
            EDIT: '/projectstatus/edit/'
        },
        PROJECT_TYPES: {
            INDEX: '/projecttypes',
            NEW: '/projecttypes/new',
            EDIT: '/projecttypes/edit/'
        },
        PROJECT_ROLES: {
            INDEX: '/projectroles',
            NEW: '/projectroles/new',
            EDIT: '/projectroles/edit/'
        },
        PROJECTS: {
            INDEX: '/projects',
            NEW: '/projects/new',
            EDIT: '/projects/edit/',
            DETAILS: '/projects/details'
        },
        CLIENTS: {
            INDEX: '/clients',
            NEW: '/clients/new',
            EDIT: '/clients/edit/'
        },

        RESOURCE_SERVER: '/api/resource',
        CORE_SERVER: '/api/core',
        AUTH_SERVER: '/api/auth/auth/refreshtoken'

    };

    module.exports = urlConstant;
})();
