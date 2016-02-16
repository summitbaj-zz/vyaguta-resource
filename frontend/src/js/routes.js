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
            <Route path="budgettypes" component={require('./components/budget-type/BudgetMain')}>
                <IndexRoute component={require('./components/budget-type/BudgetList')}/>
                <Route path="add" component={require('./components/budget-type/BudgetForm')}/>
                <Route path="edit/:budgetTypeId" component={require('./components/budget-type/BudgetForm')}/>
            </Route>
        </Route>
    </Router>
);

module.exports = routes;

