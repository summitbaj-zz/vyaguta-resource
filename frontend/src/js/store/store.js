;(function () {
    'use strict';

    //react and redux dependencies
    var redux = require('redux');
    var createStore = redux.createStore;
    var applyMiddleware = redux.applyMiddleware;
    var combineReducers = redux.combineReducers;
    var compose = redux.compose;

    //middlewares
    var thunk = require('redux-thunk');
    var logger = require('redux-logger');

    //reducers
    var crudReducer = require('../reducers/crudReducer');
    var teamMemberReducer = require('../reducers/teamMemberReducer');
    var apiReducer = require('../reducers/apiReducer');

    //Combine Reducers
    var reducers = combineReducers({
        crudReducer: crudReducer,
        teamMemberReducer: teamMemberReducer,
        apiState: apiReducer
        //add for each reducers...
    });

    var store = createStore(reducers, compose(
        applyMiddleware(thunk),

        //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
        window.devToolsExtension ? window.devToolsExtension() : function (f) {
            return f
        }
    ));

    module.exports = store;

})();