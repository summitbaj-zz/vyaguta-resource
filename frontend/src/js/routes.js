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
                <Route path="budgettypes" name="Budget Types"
                       component={require('./components/budget-type/BudgetTypeMain')}>
                    <IndexRoute component={require('./components/budget-type/BudgetTypeList')}/>
                    <Route path="new" name="Add" component={require('./components/budget-type/BudgetTypeForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/budget-type/BudgetTypeForm')}/>
                </Route>
                <Route path="projectstatus" name="Project Status"
                       component={require('./components/project-status/ProjectStatusMain')}>
                    <IndexRoute component={require('./components/project-status/ProjectStatusList')}/>
                    <Route path="new" name="Add"
                           component={require('./components/project-status/ProjectStatusForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/project-status/ProjectStatusForm')}/>
                </Route>
                <Route path="projecttypes" name="Project Types"
                       component={require('./components/project-type/ProjectTypeMain')}>
                    <IndexRoute component={require('./components/project-type/ProjectTypeList')}/>
                    <Route path="new" name="Add"
                           component={require('./components/project-type/ProjectTypeForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/project-type/ProjectTypeForm')}/>
                </Route>
                <Route path="projects" name="Projects"
                       component={require('./components/project/ProjectMain')}>
                    <IndexRoute component={require('./components/project/ProjectList')}/>
                    <Route path="new" name="Add"
                           component={require('./components/project/ProjectForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/project/ProjectForm')}/>
                    <Route path="details/:id" name="Details"
                           component={require('./components/project/ProjectDetails')}/>
                </Route>
            </Route>
        </Router>

    );

    module.exports = routes;

})();
