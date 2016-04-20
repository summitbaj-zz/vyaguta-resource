/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/19/16.
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var middlewares = [thunk];
var mockStore = configureStore(middlewares);

var crudReducer = {
    projectStatus: [],
    budgetTypes: [],
    projectTypes: [],
    projects: [],
    projectRoles: [],
    clients: [],
    selectedItem: { //for editing or viewing purposes
        projects: {
            budgetType: {},
            projectType: {},
            projectStatus: {},
            accountManager: {},
            client: {},
            contracts: {}
        },
        projectRoles: {},
        budgetTypes: {},
        projectTypes: {},
        clients: {},
        projectStatus: {}
    },
    pagination: {},
};

var contractReducer = {
    contracts: [{
        budgetType: null,
        startDate: null,
        endDate: null,
        resource: null,
        contractMembers: []
    }],
    allocations: [],
    selectedContractMember: {}
};

var state = {
    crudReducer: crudReducer,
    contractReducer: contractReducer
};

var store = mockStore(state);

module.exports = store;
