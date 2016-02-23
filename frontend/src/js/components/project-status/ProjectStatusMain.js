;(function () {
    'use strict';

    var React = require('react');
    var ProjectStatusMain = React.createClass({
        render: function () {
            return (
                <div id="page-content">
                    {this.props.children}
                </div>
            )
        }
    });

    module.exports = ProjectStatusMain;

})();