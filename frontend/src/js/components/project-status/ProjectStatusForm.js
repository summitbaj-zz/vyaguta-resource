;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/FormValidator');
    var crudActions = require('../../actions/crudActions');

    var ProjectStatusForm = React.createClass({
        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECT_STATUS, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECT_STATUS);
        },

        //called when form is submitted
        saveProjectStatus: function (event) {
            event.preventDefault();

            var projectStatus = {
                title: this.refs.title.value
            }

            if (formValidator.isValid(projectStatus)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.PROJECT_STATUS, projectStatus, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECT_STATUS, projectStatus);
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

        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstant.PROJECT_STATUS, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project Status':'Add Project Status'}
                                         routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">Project Status Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectStatus}>
                            <div className="form-group">
                                <label>Project Status</label>
                                <input type="text" ref="title" name="title"
                                       value={this.props.selectedItem.projectStatus.title}
                                       onChange={this.handleChange}
                                       placeholder="Project Status"
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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusForm)
})();