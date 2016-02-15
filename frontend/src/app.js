;(function(){
    'use strict';

    var jQuery = require('jquery'),
        React = require('react'),
        ReactDOM = require('react-dom'),
        Sidebar = require('./js/components/sidebar/sidebar'),
        Header = require('./js/components/header/header'),
        Footer = require('./js/components/footer/footer');

    var App = React.createClass({
        render: function(){
            return (
                <div id="page-container" className="sidebar-partial sidebar-visible-lg">
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

})();


