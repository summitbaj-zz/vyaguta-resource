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
            <Route path="/" name="Dashboard" component={require('./components/App')}>
                <IndexRoute component={require('./components/dashboard/Dashboard')}/>
                <Route path="budgettypes" name="Budget Types" component={require('./components/budget-type/BudgetTypeMain')}>
                    <IndexRoute component={require('./components/budget-type/BudgetTypeList')}/>
                    <Route path="new" name="Add" component={require('./components/budget-type/BudgetTypeForm')}/>
                    <Route path="edit/:id" name="Edit" component={require('./components/budget-type/BudgetTypeForm')}/>
                </Route>
                <Route path="projectstatus" name ="Project Status" component={require('./components/project-status/ProjectStatusMain')}>
                    <IndexRoute component={require('./components/project-status/ProjectStatusList')}/>
                    <Route path="new" name="Add" component={require('./components/project-status/ProjectStatusForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/project-status/ProjectStatusForm')}/>
                </Route>
            </Route>
        </Router>
    );

    module.exports = routes;

})();
