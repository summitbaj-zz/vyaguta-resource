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

    var ProjectTypeForm = React.createClass({
        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECT_TYPES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECT_TYPES);
        },

        //called when form is submitted
        saveProjectType: function (event) {
            event.preventDefault();

            var projectType = {
                title: this.refs.title.value
            }

            if (formValidator.isRequired(projectType)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.PROJECT_TYPES, projectType, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECT_TYPES, projectType);
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

            this.props.actions.updateSelectedItem(resourceConstant.PROJECT_TYPES, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project Type':'Add Project Type'}
                                  routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">Project Type Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectType}>
                            <div className="form-group">
                                <label>Project Type</label>
                                <input type="text" ref="title" name="title"
                                       value={this.props.selectedItem.projectTypes.title}
                                       onChange={this.fieldChange}
                                       placeholder="Project Type"
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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectTypeForm);

})();