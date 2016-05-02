;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //components
    var InProgressProjectRow = require('./InProgressProjectRow');

    //constants
    var urlConstant = require('../../../constants/urlConstants');

    //util
    var listUtil = require('../../../util/listUtil');

    var InProgressProjects = React.createClass({
        renderProject: function (key) {
            return (
                <InProgressProjectRow key={key} index={parseInt(key) + 1} project={this.props.projects[key]}/>
            );
        },

        render: function () {
            return (
                <div className="block clearfix">
                    <div className="block-title"><h2>Project Details</h2>
                        <div className="block-options pull-right">
                            <Link to={urlConstant.PROJECTS.INDEX} title="List Project"
                                  className="btn btn-sm btn-ghost btn-success text-uppercase"> View All</Link>
                        </div>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-vcenter table-hover table-striped">
                            <thead>
                            <tr>
                                <th>S.No.</th>
                                <th className="col-250">Projects</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.projects.length ? Object.keys(this.props.projects).map(this.renderProject) : listUtil.displayNoRecordFound()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    });
    module.exports = InProgressProjects;
})();