;(function(){
    var $ = jQuery = require("jquery");
    var React = require("react");
    var ReactDOM = require('react-dom');

    var Sidebar = require("./js/components/sidebar/sidebar");
    var Header = require("./js/components/header/header");
    var Footer = require("./js/components/footer/footer");

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


