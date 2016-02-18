;(function() {
    'use strict';

    var React = require('react');
    var Header = require('./ProjectStatusHeader');
    var history = require('react-router').History;
    var ApiUtil = require('../../api-util/ApiUtil');
    var resourceConstant = require('../../constants/resourceConstant');
    var Toastr = require('toastr');

    const PAGE_TITLE = 'Project Status';
    var projectStatusId = null;

    var ProjectForm = React.createClass({
        mixins: [history],

        getInitialState: function () {
            return {
                projectStatus: {}
            }
        },

        componentDidMount: function () {
            if (this.projectStatusId) {
                ApiUtil.fetchById(resourceConstant.PROJECT_STATUS, this.projectStatusId, this.changeState);
            }
        },

        changeState: function (status) {
            this.setState({projectStatus: status});
        },

        submitForm: function (event) {
            event.preventDefault();

            var that = this;
            var submittedProjectStatus = {
                name: this.refs.name.value
            }
            if (this.projectStatusId) {
                ApiUtil.edit(resourceConstant.PROJECT_STATUS, submittedProjectStatus, this.projectStatusId, function (data) {
                    Toastr.success("Project Status Successfully Edited");
                    that.history.pushState(null, '/projectstatus');
                });
            } else {
                ApiUtil.create(resourceConstant.PROJECT_STATUS, submittedProjectStatus, function (data) {
                    Toastr.success("Project Status Successfully Added");
                    that.history.pushState(null, "/projectstatus");
                });
            }
        },

        fieldChange: function (event) {
            var field = event.target.name;
            var value = event.target.value;

            this.state.projectStatus[field] = value;
            return this.setState({projectStatus: this.state.projectStatus});
        },
        render: function () {
            if (this.props.params)
                this.projectStatusId = this.props.params.projectStatusId;
            var action = this.projectStatusId ? 'Edit ' : 'Create ';
            return (
                <div>
                    <Header header={action + PAGE_TITLE}/>
                    <div className="block">
                        <div className="block-title-border">{action} Project Status</div>
                        <form className="form-bordered" method="post" onSubmit={this.submitForm}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" ref="name" name="name" value={this.state.projectStatus.name}
                                       onChange={this.fieldChange}
                                       placeholder="Project Status Name"
                                       className="form-control" required/>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit"><i
                                        className="fa fa-angle-right"></i>{action}
                                    </button>
                                    <button className="btn btn-sm btn-default" type="reset"><i
                                        className="fa fa-repeat"></i>Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    });
    module.exports = ProjectForm;
})();