;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var ProjectTypeMain = React.createClass({
        render: function () {
            return (
                <div id="page-content">
                    {this.props.children}
                </div>
            )
        }
    });

    module.exports = ProjectTypeMain;

})();