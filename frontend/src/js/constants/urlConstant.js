/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */

;(function () {
    var BASE_PATH = '/resource';

    var urlConstant = {
        BASE_PATH: BASE_PATH,
        BUDGET_TYPES: {
            INDEX: BASE_PATH + '/budgettypes',
            NEW: BASE_PATH + '/budgettypes/new',
            EDIT: BASE_PATH + '/budgettypes/edit'
        },
        PROJECT_STATUS: {
            INDEX: BASE_PATH + '/projectstatus',
            NEW: BASE_PATH + '/projectstatus/new',
            EDIT: BASE_PATH + '/projectstatus/edit/'
        },
        PROJECT_TYPES: {
            INDEX: BASE_PATH + '/projecttypes',
            NEW: BASE_PATH + '/projecttypes/new',
            EDIT: BASE_PATH + '/projecttypes/edit/'
        },
        PROJECTS: {
            INDEX: BASE_PATH + '/projects',
            NEW: BASE_PATH + '/projects/new',
            EDIT: BASE_PATH + '/projects/edit/'
        },
        RESOURCE_SERVER: '/api/resource',
        CORE_SERVER: '/api/core'
    };

    module.exports = urlConstant;
})();
