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
    var apiReducer = require('../reducers/apiReducer');
    var contractReducer = require('../reducers/contractReducer');

    //Combine Reducers
    var reducers = combineReducers({
        crudReducer: crudReducer,
        apiReducer: apiReducer,
        contractReducer: contractReducer
        //add for each reducers...
    });

    var store = createStore(reducers, compose(
        applyMiddleware(thunk),

        //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
        window.devToolsExtension ? window.devToolsExtension() : function (f) {
            return f;
        }
    ));

    module.exports = store;

})();