;(function(){
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom');

    var Footer = React.createClass({
        render: function(){
            return (
                <footer className="clearfix">
                    <span></span> &copy;
                    <a href="#" target="_blank">Leapfrog Technology Inc</a>
                </footer>
            )
        }
    });

    module.exports = Footer

})();
