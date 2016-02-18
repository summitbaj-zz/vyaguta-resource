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
                <Route path="add" component={require('./components/budget-type/BudgetTypeForm')}/>
                <Route path="edit/:budgetTypeId" component={require('./components/budget-type/BudgetTypeForm')}/>
            </Route>
            <Route path="projectstatus" component={require('./components/project-status/ProjectStatusMain')}>
                <IndexRoute component={require('./components/project-status/ProjectStatusList')}/>
                <Route path="create" component={require('./components/project-status/ProjectStatusForm')}/>
                <Route path="edit/:id" component={require('./components/project-status/ProjectStatusForm')}/>
            </Route>
        </Route>
    </Router>
);

module.exports = routes;

