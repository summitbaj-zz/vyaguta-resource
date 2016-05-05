;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../../constants/urlConstants');

    var EndingProjectRow = React.createClass({
        render: function () {
            var endingProject = this.props.endingProject;
            return (
                <li className="list-group-item">
                       <span className="list-group-project"><Link
                           to={urlConstants.PROJECTS.INDEX + '/' + endingProject.projectId +  urlConstants.PROJECTS.VIEW}>{endingProject.project}</Link>
                    </span>
                    <span>{endingProject.endDate}</span>
                    <span>{endingProject.resources}</span>
                </li>
            );
        }
    });

    module.exports = EndingProjectRow;

})();