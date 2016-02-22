;(function () {
    'use-strict';

    var React = require('react');
    var Link = require('react-router').Link;

    var ApiUtil = require('../../util/ApiUtil');
    var ProjectStatus = require('./ProjectStatusRow');
    var ProjectStatusHeader = require('./ProjectStatusHeader');

    var _ = require('lodash');
    var Toastr = require('toastr');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var PAGE_TITLE = 'Project Status';

    var ProjectStatusList = React.createClass({
        getInitialState: function () {
            return {
                projectStatus: []
            }
        },

        componentDidMount: function () {
            ApiUtil.fetchAll(resourceConstant.PROJECT_STATUS, this.setNewState);
        },


        setNewState: function (data) {
            this.state.projectStatus = data;
            this.setState({projectStatus: this.state.projectStatus});
        },

        list: function (key) {
            return (
                <ProjectStatus key={key} index={key} projectStatus={this.state.projectStatus[key]}
                               deleteProjectStatus={this.delete}/>
            );
        },

        removeRecordFromState: function (id) {
            var that = this;
            Toastr.success('Project Status Successfully Deleted');
            var index = _.indexOf(that.state.projectStatus, _.find(that.state.projectStatus, {id: id}));
            that.state.projectStatus.splice(index, 1);
            that.setState({projectStatus: that.state.projectStatus});
        },

        delete: function (key) {
            var that = this;
            if (confirm('Do you want to delete this item?')) {
                ApiUtil.delete(resourceConstant.PROJECT_STATUS, key, this.removeRecordFromState);
            }
        },
        render: function () {
            var projectStatusIds = Object.keys(this.state.projectStatus);
            return (
                <div>
                    <ProjectStatusHeader header={PAGE_TITLE}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Status Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_STATUS.NEW} title="Add Project Status" data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Status</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projectStatusIds.map(this.list)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    });
    module.exports = ProjectStatusList;
})();