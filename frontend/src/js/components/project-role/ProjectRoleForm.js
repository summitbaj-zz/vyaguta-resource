;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/FormValidator');
    var crudActions = require('../../actions/crudActions');

    var ProjectRoleForm = React.createClass({
        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECT_ROLES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECT_ROLES);
        },

        //called when form is submitted
        saveProjectRole: function (event) {
            event.preventDefault();

            var projectRole = {
                title: this.refs.title.value
            }

            if (formValidator.isRequired(projectRole)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.PROJECT_ROLES, projectRole, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECT_ROLES, projectRole);
                }
            } else {
                this.showErrors(formValidator.errors);
            }
        },

        showErrors: function (errors) {
            for (var elementId in errors) {
                var parentElement = $('#' + elementId).parent();

                if (!parentElement.hasClass('has-error')) {
                    parentElement.addClass('has-error');
                }
                parentElement.children('span').html(errors[elementId]);
            }
        },

        fieldChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstant.PROJECT_ROLES, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project Role':'Add Project Role'}
                                  routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">Project Role Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectRole}>
                            <div className="form-group">
                                <label>Project Role</label>
                                <input type="text" ref="title" name="title"
                                       value={this.props.selectedItem.projectRoles.title}
                                       onChange={this.fieldChange}
                                       placeholder="Project Role"
                                       className="form-control"
                                       id="title"/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit" id="save-btn"><i
                                        className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                    </button>
                                    <button className="btn btn-sm btn-danger" type="button"
                                            onClick={browserHistory.goBack}><i
                                        className="fa fa-remove"></i>Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            selectedItem: state.crudReducer.selectedItem
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectRoleForm);

})();