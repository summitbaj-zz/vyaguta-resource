;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var ReactRouter = require('react-router');
    var Link = ReactRouter.Link;

    //constants
    var urlConstant = require('../../../constants/urlConstant');

    var Sidebar = React.createClass({
        render: function () {
            return (
                <div id="sidebar">
                    <div className="sidebar-scroll">
                        <div className="sidebar-content">
                            <h1><Link to={urlConstant.BASE_PATH} className="sidebar-brand">Leapfrog Management
                                System</Link></h1>
                            <ul className="sidebar-nav">
                                <li><Link to={urlConstant.BASE_PATH} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Dashboard</span>
                                </Link></li>
                                <li><Link to={urlConstant.BUDGET_TYPES.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Budget Types</span>
                                </Link></li>
                                <li><Link to={urlConstant.PROJECT_STATUS.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span
                                    className="xn-text">Project Status</span>
                                </Link></li>
                                <li><Link to={urlConstant.PROJECT_TYPES.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Project Types</span>
                                </Link></li>
                                <li><Link to={urlConstant.PROJECTS.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Projects</span>
                                </Link></li>
                                <li><Link to={urlConstant.PROJECT_ROLES.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Project Roles</span>
                                </Link></li>
                                <li><Link to={urlConstant.CLIENTS.INDEX} className="sidebar-nav-menu"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Clients</span>
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = Sidebar
})();
