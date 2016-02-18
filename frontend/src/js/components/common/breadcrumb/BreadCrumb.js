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
        this.routes = this.props.routes;
        var newRoute = '';
        var arrays = [];
        for (var i in this.routes) {
            if (this.routes[i].path && this.routes[i].name) {
                newRoute = newRoute.concat(this.routes[i].path);
                var newPath = {
                    name: this.routes[i].name,
                    route: this.routes[i].path
                };
                this.state.paths.push(newPath);
            }
        }
        this.setState({paths: this.state.paths});
        console.warn(this.state.paths);
    },

    getComponent: function (key) {
        return (
           <Link to={this.state.paths[key].route} key={key}>{this.state.paths[key].name} </Link>
        );
    },
    render: function () {
        return(<div></div>);
        var componentIds = Object.keys(this.state.paths);
        componentIds.splice(-1, 1);
        return (
            <ul className="breadcrumb breadcrumb-top">
                <li>{componentIds.map(this.getComponent)}</li>
                <li>{this.state.paths[this.state.paths.length - 1].name}</li>
            </ul>
        );
    }
});

module.exports = BreadCrumb;
