;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var Footer = React.createClass({
        render: function () {
            return (
                <footer className="clearfix">
                    <span></span> &copy;
                    <a href="http://www.lftechnology.com/" target="_blank">Leapfrog Technology Inc.</a>
                </footer>
            )
        }
    });

    module.exports = Footer

})();
