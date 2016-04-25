;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstant');

    var FlaggedProjectRow = React.createClass({
        render: function () {
            var flaggedProject = this.props.flaggedProject;
            return (
                <li className="list-group-item">
                       <span className="list-group-project"><Link
                           to={urlConstant.PROJECTS.INDEX + '/' + flaggedProject.projectId +  urlConstant.PROJECTS.VIEW}>{flaggedProject.project}</Link>
                    </span>
                    <span>{flaggedProject.endDate}</span>
                    <span>{flaggedProject.resources}</span>
                </li>
            );
        }
    });
    module.exports = FlaggedProjectRow;
})();