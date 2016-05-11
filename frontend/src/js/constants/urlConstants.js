/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */

;(function () {

    var urlConstants = {
        BASE_PATH: '',
        BUDGET_TYPES: {
            INDEX: '/budgettypes',
            NEW: '/budgettypes/new',
        },
        PROJECT_STATUS: {
            INDEX: '/projectstatus',
            NEW: '/projectstatus/new',
        },
        PROJECT_TYPES: {
            INDEX: '/projecttypes',
            NEW: '/projecttypes/new',
        },
        PROJECT_ROLES: {
            INDEX: '/projectroles',
            NEW: '/projectroles/new',
        },
        PROJECTS: {
            INDEX: '/projects',
            NEW: '/projects/new',
            VIEW: '/view',
            HISTORY: '/history'
        },
        CLIENTS: {
            INDEX: '/clients',
            NEW: '/clients/new',
        },
        OPERATIONAL_RESOURCES: {
            INDEX: '/operationalresources',
            NEW: '/operationalresources/new',
        },

        RESOURCE_SERVER: '/api/resource',
        CORE_SERVER: '/api/core',
        AUTH_SERVER: '/api/auth/auth/refreshtoken',

        PAGE_NOT_FOUND: '404PageNotFound'
    };

    module.exports = urlConstants;

})();
