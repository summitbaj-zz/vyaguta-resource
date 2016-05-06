;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //services
    var convertContractHash = require('../../../services/convertContractHash');

    //components
    var OverdueProjectRow = require('./OverdueProjectRow');

    //constants
    var messageConstants = require('../../../constants/messageConstants');

    var OverdueProjects = React.createClass({
        renderOverdueProject: function (key) {
            return <OverdueProjectRow key={key} overdueProject={this.props.overdueProjects[key]}/>;
        },

        displayNoRecordFound: function () {
            return <li className="list-group-item not-found-message">{messageConstants.NO_RECORDS_FOUND}</li>;
        },

        render: function () {
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
                                {this.props.overdueProjects.length ? Object.keys(this.props.overdueProjects).map(this.renderOverdueProject) : this.displayNoRecordFound()}
                            </ul>
                        </div>

                    </div>
                </div>
            );
        }
    });

    module.exports = OverdueProjects;

})();