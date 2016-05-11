;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var ReactRouter = require('react-router');
    var Link = ReactRouter.Link;
    var IndexLink = ReactRouter.IndexLink;

    //constants
    var urlConstants = require('../../../constants/urlConstants');

    var Sidebar = React.createClass({
        render: function () {
            return (
                <div id="sidebar">
                    <div className="sidebar-scroll">
                        <div className="sidebar-content">
                            <h1><IndexLink to={urlConstants.BASE_PATH}
                                           className="sidebar-brand">Leapfrog Management
                                System</IndexLink></h1>
                            <ul className="sidebar-nav">
                                <li><IndexLink to={urlConstants.BASE_PATH} activeClassName="active"><i
                                    className="fa fa-dashboard fa-fw"></i><span className="xn-text">Dashboard</span>
                                </IndexLink></li>

                                <li><Link to={urlConstants.PROJECTS.INDEX} activeClassName="active"><i
                                    className="icomoon icon-project fa-fw"></i><span className="xn-text">Projects</span>
                                </Link></li>
                                <li><Link to={urlConstants.CLIENTS.INDEX} activeClassName="active"><i
                                    className="fa fa-users fa-fw"></i><span className="xn-text">Clients</span>
                                </Link></li>
                                <li><Link to={urlConstants.OPERATIONAL_RESOURCES.INDEX} activeClassName="active"><i
                                    className="fa fa-users fa-fw"></i><span className="xn-text">Operational Resource</span>
                                </Link></li>
                                <li><a className="sidebar-nav-menu" href="#"><i
                                    className="fa fa fa-cogs fa-fw"></i><span
                                    className="xn-text">Project Settings</span><i
                                    className="fa fa-angle-down sidebar-nav-indicator"></i></a>
                                    <ul>
                                        <li>
                                            <Link to={urlConstants.BUDGET_TYPES.INDEX} activeClassName="active">Budget
                                                Types</Link>
                                        </li>
                                        <li><Link to={urlConstants.PROJECT_STATUS.INDEX} activeClassName="active">Project
                                            Status
                                        </Link></li>
                                        <li><Link to={urlConstants.PROJECT_TYPES.INDEX} activeClassName="active">Project
                                            Types
                                        </Link></li>
                                        <li><Link to={urlConstants.PROJECT_ROLES.INDEX} activeClassName="active">Project
                                            Roles
                                        </Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    });

    module.exports = Sidebar;

})();
