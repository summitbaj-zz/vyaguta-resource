/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */

;(function () {
    var urlConstant = {
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
        }
    };

    module.exports = urlConstant;
})();