;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var dashboardUtil = require('../../../util/dashboardUtil');

    //components
    var EndingProjectRow = require('./EndingProjectRow');

    var EndingProjects = React.createClass({
        renderEndingProject: function (endingProject) {
            return (
                <EndingProjectRow key={endingProject.id} endingProject={endingProject}/>
            );
        },

        render: function () {
            var endingProjects = dashboardUtil.getEndingProjectsData(this.props.endingProjects);

            return (
                <div className="col-lg-6">
                    <div className="block">
                        <div className="block-title-border clearfix"><span
                            className="pull-left">Projects Ending </span>
                        </div>
                        <div className="list-wrapper">
                            <ul className="list-group">
                                <li className="list-group-item"><span
                                    className="list-group-project">Projects</span>
                                    <span>End Date</span><span>Resources</span>
                                </li>
                                {endingProjects.map(this.renderEndingProject)}
                                <li className="list-group-item total">
                                    <span>Total</span><span>{dashboardUtil.getEndingProjectsResourceTotal(endingProjects)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            );
        }
    });
    module.exports = EndingProjects;
})();