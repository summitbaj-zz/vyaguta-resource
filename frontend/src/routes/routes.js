;(function(){
    var React = require("react");
    var ReactDOM = require("react-dom");
    var ReactRouter = require("react-router");
    var Router = ReactRouter.Router;
    var createBrowserHistory = require('history/lib/createBrowserHistory');

    var IndexRoute = ReactRouter.IndexRoute;
    var Route = ReactRouter.Route;

    var routes =(
        <Router history={createBrowserHistory()}>
            <Route path="/" component={require('../app')}>
                <IndexRoute component={require('../js/components/dashboard/dashboard')} />
                <Route path="new" component={require('../js/components/new/new')}/>
            </Route>
        </Router>
    );
    module.exports = routes;

    ReactDOM.render(routes, document.querySelector('#vyaguta-body'));

})();


