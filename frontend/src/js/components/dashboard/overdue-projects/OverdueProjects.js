;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var convertContractHash = require('../../../util/convertContractHash');

    //components
    var OverdueProjectRow = require('./OverdueProjectRow');

    var OverdueProjects = React.createClass({
        renderOverdueProject: function (key) {
            return (
                <OverdueProjectRow key={key} overdueProject={this.props.overdueProjects[key]}/>
            );
        },

        render: function () {
            var overdueProjects = this.props.overdueProjects;
            return (
                <div className="col-lg-6">
                    <div className="block">
                        <div className="block-title-border clearfix"><span
                            className="pull-left">Projects Overdue </span>
                        </div>
                        <div className="list-wrapper">
                            <ul className="list-group">
                                <li className="list-group-item"><span
                                    className="list-group-project">Projects</span>
                                    <span className="project-status">Project Status</span><span>End Date</span>
                                </li>
                                {overdueProjects && Object.keys(overdueProjects).map(this.renderOverdueProject)}
                            </ul>
                        </div>

                    </div>
                </div>
            );
        }
    });
    module.exports = OverdueProjects;
})();