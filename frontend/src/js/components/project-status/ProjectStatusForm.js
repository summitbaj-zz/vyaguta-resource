;(function () {
    'use strict';

    var React = require('react');
    var ProjectStatusHeader = require('./ProjectStatusHeader');
    var history = require('react-router').History;
    var ApiUtil = require('../../util/ApiUtil');
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');
    var Toastr = require('toastr');
    var formValidator = require('../../util/FormValidator');

    var PAGE_TITLE = 'Project Status';
    var projectStatusId = null;

    var ProjectStatusForm = React.createClass({
        mixins: [history],

        getInitialState: function () {
            return {
                projectStatus: {}
            }
        },

        componentDidMount: function () {
            if (this.props.params.id) {
                ApiUtil.fetchById(resourceConstant.PROJECT_STATUS, this.props.params.id, this.changeState);
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

            if (formValidator.isValid(submittedProjectStatus)) {
                if (this.projectStatusId) {
                    ApiUtil.edit(resourceConstant.PROJECT_STATUS, submittedProjectStatus, this.projectStatusId, function (data) {
                        document.querySelector('#save-btn').disabled = true;
                        that.history.pushState(null, urlConstant.PROJECT_STATUS.INDEX);
                        Toastr.success("Project Status Successfully Edited");
                    });
                } else {
                    ApiUtil.create(resourceConstant.PROJECT_STATUS, submittedProjectStatus, function (data) {
                        document.querySelector('#save-btn').disabled = true;
                        that.history.pushState(null, urlConstant.PROJECT_STATUS.INDEX);
                        Toastr.success("Project Status Successfully Added");
                    });
                }
            } else {
                this.showErrors(formValidator.errors)
            }
        },

        showErrors: function (errors) {
            for (var elementId in errors) {
                var parentElement = document.querySelector('#' + elementId).parentElement;

                parentElement.className += " has-error";
                parentElement.querySelector('span').innerHTML = errors[elementId];
            }
        },

        fieldChange: function (event) {
            var field = event.target.name;
            var value = event.target.value;

            this.state.projectStatus[field] = value;
            return this.setState({projectStatus: this.state.projectStatus});
        },

        render: function () {
            var action = this.props.params.id ? 'Edit ' : 'Create ';
            return (
                <div>
                    <ProjectStatusHeader header={action + PAGE_TITLE} routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">{action} Project Status</div>
                        <form className="form-bordered" method="post" onSubmit={this.submitForm}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" ref="name" name="name" value={this.state.projectStatus.name}
                                       onChange={this.fieldChange}
                                       placeholder="Project Status Name"
                                       className="form-control"
                                        id="name"/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit" id="save-btn"><i
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
    module.exports = ProjectStatusForm;
})();