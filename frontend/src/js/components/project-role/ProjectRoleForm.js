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
    var messageConstant = require('../../constants/messageConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/FormValidator');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    var ProjectRoleForm = React.createClass({
        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECT_ROLES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECT_ROLES);
            this.props.actions.apiClearState();
        },

        //called when form is submitted
        saveProjectRole: function (event) {
            event.preventDefault();

            var projectRole = {
                title: this.refs.title.value
            }
            formValidator.validateForm(projectRole);

            if (formValidator.isValid()) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.PROJECT_ROLES, projectRole, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECT_ROLES, projectRole);
                }
            } else {
                Toastr.error(messageConstant.FORM_INVALID_SUBMISSION_MESSAGE, messageConstant.TOASTR_INVALID_HEADER);
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
                                <label>Project Role *</label>
                                <input type="text" ref="title" name="title"
                                       value={this.props.selectedItem.projectRoles.title}
                                       onChange={this.fieldChange}
                                       onBlur={formValidator.validateField}
                                       onFocus={formValidator.removeError.bind(null, 'title')}
                                       placeholder="Project Role"
                                       className="form-control"
                                       id="title"
                                       disabled={this.props.apiState.isRequesting}/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success"
                                            type="submit"
                                            id="save-btn"
                                            disabled={this.props.apiState.isRequesting}><i
                                        className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                            type="button"
                                            onClick={browserHistory.goBack}
                                            disabled={this.props.apiState.isRequesting}>
                                        <i className="fa fa-remove"></i>Cancel
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
            selectedItem: state.crudReducer.selectedItem,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectRoleForm);

})();