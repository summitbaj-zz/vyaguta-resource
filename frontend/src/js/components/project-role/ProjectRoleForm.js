;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstants');
    var urlConstant = require('../../constants/urlConstants');
    var messageConstant = require('../../constants/messageConstants');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/formValidator');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    var ProjectRoleForm = React.createClass({
        getInitialState: function () {
            return {
                autoFocus: true
            }
        },

        componentWillMount: function () {
            if (this.props.params.id) {
                this.setState({autoFocus: false});
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

            if (formValidator.isValid(projectRole)) {
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
                                  routes={this.props.routes}
                                  title={this.props.selectedItem.projectRoles.title || 'Project Role'}
                                  apiState={this.props.apiState}/>
                    <div className="block">
                        <div className="block-title-border">Project Role Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectRole}>
                            <fieldset disabled={this.props.apiState.isRequesting}>
                                <div className="form-group">
                                    <label>Project Role *</label>
                                    <input type="text" ref="title" name="title"
                                           value={this.props.selectedItem.projectRoles.title}
                                           onChange={this.fieldChange}
                                           placeholder="Project Role"
                                           onBlur={formValidator.validateField}
                                           onFocus={formValidator.removeFeedback.bind(null, 'title')}
                                           className="form-control"
                                           id="title"
                                           autoFocus={this.state.autoFocus}
                                    />
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group form-actions clearfix">
                                    <div className="pull-right">
                                        <button className="btn btn-sm btn-success"
                                                type="submit"
                                                id="save-btn">
                                            <i className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                                type="button"
                                                onClick={browserHistory.goBack}>
                                            <i className="fa fa-remove"></i>Cancel
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
                ;
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