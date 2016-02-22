/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var routes = require('./routes');
    var store = require('./store/store');
    var Provider = require('react-redux').Provider;

    var initialState = {
        budgetTypes: [{
            id: 0,
            title: 'initial',
        }]
    };

    ReactDOM.render(
        <Provider store={store}>
            {routes}
        </Provider>,
        document.querySelector('#vyaguta-body')
    );

})();