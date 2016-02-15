;(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        ReactRouter = require('react-router'),
        Router = ReactRouter.Router,
        createBrowserHistory = require('history/lib/createBrowserHistory'),
        IndexRoute = ReactRouter.IndexRoute,
        Route = ReactRouter.Route;

    var routes = (
        <Router history={createBrowserHistory()}>
            <Route path="/" component={require('../app')}>
                <IndexRoute component={require('../js/components/dashboard/dashboard')}/>
                <Route path="new" component={require('../js/components/new/new')}/>
            </Route>
        </Router>
    );
    module.exports = routes;

    ReactDOM.render(routes, document.querySelector('#vyaguta-body'));

})();


