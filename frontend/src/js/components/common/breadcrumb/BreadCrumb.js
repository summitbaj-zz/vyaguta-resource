;(function () {
    'use strict';

    var React = require('react');
    var Link = require('react-router').Link;

    var BreadCrumb = React.createClass({
        getInitialState(){
            return {
                paths: []
            }
        },

        componentWillMount: function () {
            this.setPathState();
        },

        setPathState: function () {
            var routes = this.props.routes;
            var newRoute = '';
            var arrays = [];
            for (var i in routes) {
                if (routes[i].path && routes[i].name) {
                    if (i > 1)
                        newRoute = newRoute.concat('/');
                    newRoute = newRoute.concat(routes[i].path);

                    var newPath = {
                        name: routes[i].name,
                        route: newRoute
                    };
                    this.state.paths.push(newPath);
                }
            }
            this.setState({paths: this.state.paths});
        },

        getComponent: function (key) {
            return (
                <li key={key}>
                    <Link to={this.state.paths[key].route}>{this.state.paths[key].name} </Link>
                </li>
            );
        },

        render: function () {
            var componentIds = Object.keys(this.state.paths);
            componentIds.splice(-1, 1);
            if (this.state.paths.length) {
                return (
                    <ul className="breadcrumb breadcrumb-top">
                        {componentIds.map(this.getComponent)}
                        <li>{this.state.paths[this.state.paths.length - 1].name}</li>
                    </ul>

                );
            }
            else {
                return (<div></div>);
            }
        }
    });

    module.exports = BreadCrumb;

})();
