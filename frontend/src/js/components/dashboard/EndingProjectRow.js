;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var EndingProjectRow = React.createClass({
        render: function () {
            return (
                <li className="list-group-item">
                    <span className="list-group-project">{this.props.endingProject.project}</span>
                    <span>{this.props.endingProject.endDate}</span><span>{this.props.endingProject.resources}</span>
                </li>
            );
        }
    });
    module.exports = EndingProjectRow;
})();