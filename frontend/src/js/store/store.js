/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/22/16.
 */

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var compose = redux.compose;
var logger = require('redux-logger');
var thunk = require('redux-thunk');
var combineReducers = redux.combineReducers;
var budgetTypeReducer = require('../reducers/budgetTypeReducer');

var createStoreWithMiddleWare = compose(
    applyMiddleware(thunk, logger())
)(createStore);

var reducers = combineReducers ({
    budgetTypeReducer: budgetTypeReducer
})

module.exports = createStoreWithMiddleWare(reducers);