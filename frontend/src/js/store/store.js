;(function () {
    'use strict';

    var redux = require('redux');
    var thunk = require('redux-thunk');
    var logger = require('redux-logger');

    var crudReducer = require('../reducers/crudReducer');
    var errorReducer = require('../reducers/errorReducer');
    var createStore = redux.createStore;
    var applyMiddleware = redux.applyMiddleware;
    var combineReducers = redux.combineReducers;

//Apply middleware to createStore
    var createStoreWithMiddleware = applyMiddleware(thunk, logger())(createStore);

//Combine Reducers
    var reducers = combineReducers({
        crudReducer: crudReducer,
        errorReducer: errorReducer
        //add for each reducers...
    });

    var store = createStoreWithMiddleware(reducers);

    module.exports = store;

})();