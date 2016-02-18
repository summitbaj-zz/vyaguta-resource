;(function () {
    'use strict';

    var React = require('react'),
        ReactRouter = require('react-router'),
        Router = ReactRouter.Router,
        Route = ReactRouter.Route,
        createBrowserHistory = require('history/lib/createBrowserHistory'),
        IndexRoute = ReactRouter.IndexRoute;


    var routes = (
        <Router history={createBrowserHistory()}>
            <Route path="/" component={require('./components/App')}>
                <IndexRoute component={require('./components/dashboard/Dashboard')}/>
                <Route path="budgettypes" component={require('./components/budget-type/BudgetTypeMain')}>
                    <IndexRoute component={require('./components/budget-type/BudgetTypeList')}/>
                    <Route path="new" component={require('./components/budget-type/BudgetTypeForm')}/>
                    <Route path="edit/:id" component={require('./components/budget-type/BudgetTypeForm')}/>
                </Route>
            </Route>
        </Router>
    );

    module.exports = routes;

})();