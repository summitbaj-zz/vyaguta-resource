;(function () {
    'use strict';

    //React and Redux depencies
    var React = require('react');
    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var browserHistory = ReactRouter.browserHistory;
    var IndexRoute = ReactRouter.IndexRoute;
    var Redirect = ReactRouter.Redirect;
    var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
    var store = require('./store/store');
    var history = syncHistoryWithStore(browserHistory, store);

    if (localStorage.access_token) {
        var routes = (
            <Router history={history}>

                <Route path="/" name="Dashboard" component={require('./components/App')}>
                    <IndexRoute component={require('./components/dashboard/Dashboard')}/>

                    <Route path="budgettypes" name="Budget Types"
                           component={require('./components/budget-type/BudgetTypeMain')}>
                        <IndexRoute component={require('./components/budget-type/BudgetTypeList')}/>
                        <Route path="new" name="Add" component={require('./components/budget-type/BudgetTypeForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/budget-type/BudgetTypeForm')}/>
                    </Route>

                    <Route path="projectstatus" name="Project Status"
                           component={require('./components/project-status/ProjectStatusMain')}>
                        <IndexRoute component={require('./components/project-status/ProjectStatusList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project-status/ProjectStatusForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/project-status/ProjectStatusForm')}/>
                    </Route>

                    <Route path="projects" name="Projects"
                           component={require('./components/project/ProjectMain')}>
                        <IndexRoute component={require('./components/project/ProjectList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project/project-form/ProjectForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/project/project-form/ProjectForm')}/>
                        <Route path=":id/view" name="Details"
                               component={require('./components/project/project-view/ProjectDetails')}/>
                        <Route path=":id/history" name="History"
                               component={require('./components/project/ProjectHistory')}/>
                    </Route>

                    <Route path="projecttypes" name="Project Types"
                           component={require('./components/project-type/ProjectTypeMain')}>
                        <IndexRoute component={require('./components/project-type/ProjectTypeList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project-type/ProjectTypeForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/project-type/ProjectTypeForm')}/>
                    </Route>

                    <Route path="projectRoles" name="Project Roles"
                           component={require('./components/project-role/ProjectRoleMain')}>
                        <IndexRoute component={require('./components/project-role/ProjectRoleList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/project-role/ProjectRoleForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/project-role/ProjectRoleForm')}/>
                    </Route>

                    <Route path="clients" name="Clients"
                           component={require('./components/client/ClientMain')}>
                        <IndexRoute component={require('./components/client/ClientList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/client/ClientForm')}/>
                        <Route path=":id" name="Edit"
                               component={require('./components/client/ClientForm')}/>
                    </Route>

                    <Route path="operationalresources" name="Operational Resources"
                           component={require('./components/operational-resource/OperationalResourceMain')}>
                        <IndexRoute component={require('./components/operational-resource/OperationalResourceList')}/>
                        <Route path="new" name="Add"
                               component={require('./components/operational-resource/OperationalResourceForm')}/>
                    </Route>

                    <Route path="userroles" name="User Roles"
                            component={require('./components/user-role/UserRoleMain')}>
                        <IndexRoute component={require('./components/user-role/UserRoleList')}/>
                </Route>

                </Route>
                <Route path="*" component={require('./components/common/error-pages/PageNotFoundError')}/>
            </Router>
        );
    } else {
        window.location.href = window.location.origin;
    }

    module.exports = routes;

})();
