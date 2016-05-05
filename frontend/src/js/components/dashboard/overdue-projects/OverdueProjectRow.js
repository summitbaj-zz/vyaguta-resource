;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../../constants/urlConstants');

    var OverdueProjectRow = React.createClass({
        render: function () {
            var overdueProject = this.props.overdueProject;
            var style = {
                background: overdueProject.projectStatusColor
            };
            return (
                <li className="list-group-item">
                       <span className="list-group-project"><Link
                           to={urlConstants.PROJECTS.INDEX + '/'  +  overdueProject.projectId + urlConstants.PROJECTS.VIEW}>{overdueProject.projectTitle}</Link>
                    </span>
                    <span className="label text-uppercase"
                          style={style}>{overdueProject.projectStatus}</span>
                    <span>{overdueProject.endDate}</span>
                </li>
            );
        }
    });

    module.exports = OverdueProjectRow;

})();