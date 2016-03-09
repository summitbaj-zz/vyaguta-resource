'use strict';

//React dependencies
var React = require('react');

//components
var Sidebar = require('./common/sidebar/Sidebar');
var Header = require('./common/header/Header');
var Footer = require('./common/footer/Footer');
var ErrorMessage = require('./common/error-message/ErrorMessage');

var App = React.createClass({
    render: function () {
        return (
            <div id="page-container" className="sidebar-partial sidebar-visible-lg">
                <Sidebar/>
                <div id="main-container">
                    <Header/>
                    <ErrorMessage />
                    {this.props.children}
                    <Footer/>
                </div>
            </div>
        )
    }
});

module.exports = App;