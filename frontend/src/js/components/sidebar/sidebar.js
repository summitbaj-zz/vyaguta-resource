;(function () {
    'use strict';

    var React = require("react");
    var ReactDOM = require("react-dom");
    var ReactRouter = require("react-router");
    var Link = ReactRouter.Link;

    var Sidebar = React.createClass({
        render: function () {
            return (
                <div className="sidebar-scroll">
                    <div className="sidebar-content">
                        <h1><Link to= "/">Leapfrog Management System</Link></h1>
                        <ul className="sidebar-nav">
                            <li><Link to="/new/" className="sidebar-nav-menu"><i
                                className='fa fa-dashboard fa-fw'></i><span
                                className="xn-text">New</span> </Link></li>
                        </ul>
                    </div>
                </div>


            )
        }
    });

    module.exports = Sidebar
})();
