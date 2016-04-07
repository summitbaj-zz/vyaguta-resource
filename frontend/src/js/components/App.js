'use strict';

//React dependencies
var React = require('react');

//components
var Sidebar = require('./common/sidebar/Sidebar');
var Header = require('./common/header/Header');
var Footer = require('./common/footer/Footer');

var App = React.createClass({
    render: function () {
        return (
            <div id="page-container" className="header-fixed-top footer-fixed sidebar-partial sidebar-visible-lg">
                <Sidebar/>
                <div id="main-container">
                    <Header/>
                    {this.props.children}
                    <Footer/>
                </div>
            </div>
        )
    }
});

module.exports = App;