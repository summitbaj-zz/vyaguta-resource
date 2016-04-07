;(function () {
    'use strict';

    //React and Redux depencies
    var React = require('react');
    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var browserHistory = ReactRouter.browserHistory;
    var IndexRoute = ReactRouter.IndexRoute;
    var IndexRedirect = ReactRouter.IndexRedirect;

    if (localStorage.access_token) {
        var routes = (
            <Router history={browserHistory}>

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

                <Route path="projects" name="Projects"
                       component={require('./components/project/ProjectMain')}>
                    <IndexRoute component={require('./components/project/ProjectList')}/>
                    <Route path="new" name="Add"
                           component={require('./components/project/ProjectForm')}/>
                    <Route path="edit/:id" name="Edit"
                           component={require('./components/project/ProjectForm')}/>
                    <Route path="details/:id" name="Details"
                           component={require('./components/project/ProjectDetails')}/>
                    <Route path="history/:id" name="History"
                           component={require('./components/project/ProjectHistory')}/>
                </Route>

                    <Route path="projecttypes" name="Project Types"
                           component={require('./components/project-type/ProjectTypeMain')}>
                        <IndexRoute component={require('./components/project-type/ProjectTypeList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project-type/ProjectTypeForm')}/>
                        <Route path="edit/:id" name="Edit"
                               component={require('./components/project-type/ProjectTypeForm')}/>
                    </Route>

                    <Route path="projectRoles" name="ProjectRoles"
                           component={require('./components/project-role/ProjectRoleMain')}>
                        <IndexRoute component={require('./components/project-role/ProjectRoleList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project-role/ProjectRoleForm')}/>
                        <Route path="edit/:id" name="Edit"
                               component={require('./components/project-role/ProjectRoleForm')}/>
                    </Route>

                    <Route path="clients" name="Clients"
                           component={require('./components/client/ClientMain')}>
                        <IndexRoute component={require('./components/client/ClientList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/client/ClientForm')}/>
                        <Route path="edit/:id" name="Edit"
                               component={require('./components/client/ClientForm')}/>
                    </Route>

                    <Route path="*">
                        <IndexRedirect to="/" />
                    </Route>
                </Route>
            </Router>
        );
    } else {
        window.location.href = window.location.origin;
    }
    module.exports = routes;

})();
