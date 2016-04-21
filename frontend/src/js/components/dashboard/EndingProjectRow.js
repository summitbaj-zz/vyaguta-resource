;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstant');

    var EndingProjectRow = React.createClass({
        render: function () {
            var endingProject = this.props.endingProject;
            return (
                <li className="list-group-item">
                       <span className="list-group-project"><Link
                           to={urlConstant.PROJECTS.INDEX + '/' + endingProject.projectId +  urlConstant.PROJECTS.VIEW}>{endingProject.project}</Link>
                    </span>
                    <span>{endingProject.endDate}</span>
                    <span>{endingProject.resources}</span>
                </li>
            );
        }
    });
    module.exports = EndingProjectRow;
})();