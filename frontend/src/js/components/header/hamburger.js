;(function () {
    'use strict';

    var React = require("react");
    var ReactDOM = require("react-dom");

    var Hamburger = React.createClass({
        render: function () {
            return (
                <ul className="nav navbar-nav-custom">
                    <li> <a href="javascript:void(0)" onclick="App.sidebar('toggle-sidebar');"> <i className="fa fa-bars fa-fw"></i> </a> </li>
                </ul>
            )
        }
    });

    module.exports = Hamburger;
})();
