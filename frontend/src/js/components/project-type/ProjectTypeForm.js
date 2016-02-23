;(function () {
    'use strict';

    var React = require('react');
    var ProjectTypeHeader = require('./ProjectTypeHeader');
    var history = require('react-router').History;
    var ApiUtil = require('../../util/ApiUtil');
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');
    var Toastr = require('toastr');
    var formValidator = require('../../util/FormValidator');

    var PAGE_TITLE = 'Project Type';
    var projectTypeId = null;

    var ProjectTypeForm = React.createClass({
        mixins: [history],

        getInitialState: function () {
            return {
                projectType: {}
            }
        },

        componentDidMount: function () {
            if (this.props.params.id) {
                ApiUtil.fetchById(resourceConstant.PROJECT_TYPES, this.props.params.id, this.changeState);
            }
        },

        changeState: function (type) {
            this.setState({projectType: type});
        },

        submitForm: function (event) {
            event.preventDefault();

            var that = this;
            var submittedProjectType = {
                title: this.refs.title.value
            }

            if (formValidator.isValid(submittedProjectType)) {
                if (this.props.params.id) {
                    ApiUtil.edit(resourceConstant.PROJECT_TYPES, submittedProjectType, this.props.params.id, function (data) {
                        document.querySelector('#save-btn').disabled = true;
                        that.history.pushState(null, urlConstant.PROJECT_TYPES.INDEX);
                        Toastr.success("Project Type Successfully Edited");
                    });
                } else {
                    ApiUtil.create(resourceConstant.PROJECT_TYPES, submittedProjectType, function (data) {
                        document.querySelector('#save-btn').disabled = true;
                        that.history.pushState(null, urlConstant.PROJECT_TYPES.INDEX);
                        Toastr.success("Project Type Successfully Added");
                    });
                }
            } else {
                this.showErrors(formValidator.errors);
            }
        },

        showErrors: function (errors) {
            for (var elementId in errors) {
                var parentElement = document.querySelector('#' + elementId).parentElement;
                parentElement.className += 'has-error';
                parentElement.querySelector('span').innerHTML = errors[elementId];
            }
        },

        fieldChange: function (event) {
            var field = event.target.name;
            var value = event.target.value;

            this.state.projectType[field] = value;
            return this.setState({projectType: this.state.projectType});
        },

        render: function () {
            var action = this.props.params.id ? 'Edit ' : 'Add ';
            return (
                <div>
                    <ProjectTypeHeader header={action + PAGE_TITLE} routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">Project Type Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.submitForm}>
                            <div className="form-group">
                                <label>Project Type</label>
                                <input type="text" ref="title" name="title" value={this.state.projectType.title}
                                       onChange={this.fieldChange}
                                       placeholder="Project Type"
                                       className="form-control"
                                       id="title"/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit" id="save-btn"><i
                                        className="fa fa-angle-right"></i>{this.props.params.id ? 'Update' : 'Save'}
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

    module.exports = ProjectTypeForm;

})();