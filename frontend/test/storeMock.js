/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/19/16.
 */

var configureStore = require('redux-mock-store');
var thunk = require('redux-thunk');

var reactRouterRedux = require('react-router-redux');
var routerReducer = reactRouterRedux.routerReducer;
var routerMiddleware = reactRouterRedux.routerMiddleware;

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
            contracts: []
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

var dashboardReducer = {
    projectEnding: [],
    overdue: [],
    inProgressProjects: [],
    resource: {
        utilization: {},
        booked: [],
        available: []
    }
};

var apiReducer = {
    isRequesting: false,
    numberOfRequests: 0
}

var routing = {
    locationBeforeTransitions: {
        pathname: '/'
    }
}

var state = {
    crudReducer: crudReducer,
    contractReducer: contractReducer,
    dashboardReducer: dashboardReducer,
    apiReducer: apiReducer,
    routing: routing
};

var store = mockStore(state);

module.exports = store;
