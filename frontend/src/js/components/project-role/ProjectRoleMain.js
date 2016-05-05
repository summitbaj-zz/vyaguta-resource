;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var ProjectRoleMain = React.createClass({
        render: function () {
            return (
                <div id="page-content" className="page-content">
                    {this.props.children}
                </div>
            );
        }
    });

    module.exports = ProjectRoleMain;

})();