;(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        $ = require('jquery');

    var DropDownList = React.createClass({
        render: function () {
            return (
                <ul className="nav navbar-nav-custom pull-right">
                    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown"> <i
                        className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i> </a>
                        <ul className="notification-panel dropdown-menu dropdown-alerts" id="dropdown">
                            <li><a href="#">
                                <div><i className="fa fa-comment fa-fw"></i> New Comment <span
                                    className="pull-right text-muted small">4 minutes ago</span></div>
                            </a></li>
                        </ul>

                    </li>

                    <li className="dropdown"><a href="javascript:void(0)" className="dropdown-toggle"
                                                data-toggle="dropdown">
                        <img className="profile-img img-circle" src="img/placeholders/avatar.png" alt="avatar"/> <i
                        className="fa fa-angle-down"></i> </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a></li>
                            <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a></li>
                            <li className="divider"></li>
                            <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            )
        }
    });

    module.exports = DropDownList;
})();
