;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstant');

    var FlaggedProjectRow = React.createClass({
        render: function () {
            var overdueProject = this.props.overdueProject;
            console.log(this.props);
            return (
                <li className="list-group-item">
                       <span className="list-group-project"><Link
                           to={urlConstant.PROJECTS.INDEX + '/'  +  urlConstant.PROJECTS.VIEW}>{overdueProject.project}</Link>
                    </span>
                    <span>{overdueProject.projectStatus}</span>
                    <span>{overdueProject.endDate}</span>
                </li>
            );
        }
    });
    module.exports = FlaggedProjectRow;
})();