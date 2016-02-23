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

    var Provider = require('react-redux').Provider;
    var store = require('./store');

    ReactDOM.render(
        <Provider store={store}>
            {routes}
        </Provider>,
        document.querySelector('#vyaguta-body'));

})();