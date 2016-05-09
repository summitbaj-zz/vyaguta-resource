;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var Hamburger = React.createClass({
        toggleSidebar: function () {
            App.sidebar('toggle-sidebar');
        },

        render: function () {
            return (
                <ul className="nav navbar-nav-custom">
                    <li><a href="javascript:void(0)" id="burgerMenu" onClick={this.toggleSidebar}> <i
                        className="fa fa-bars fa-fw"></i> </a></li>
                </ul>
            );
        }
    });

    module.exports = Hamburger;

})();
