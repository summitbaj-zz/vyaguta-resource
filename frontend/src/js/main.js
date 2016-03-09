/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Provider = require('react-redux').Provider;
    var store = require('./store/store');

    //components
    var routes = require('./routes');

    ReactDOM.render(
        <Provider store={store}>
            {routes}
        </Provider>,
        document.querySelector('#vyaguta-body'));

})();