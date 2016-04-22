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
            <div id="page-container" className="header-fixed-top sidebar-partial sidebar-visible-lg footer-fixed">
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