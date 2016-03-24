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
    var crudActions = require('../../actions/crudActions');
    var setColor = 0;

    //libraries
    var Toastr = require('toastr');

    var ProjectStatusForm = React.createClass({
        componentDidMount: function () {
            $('#colorselector').colorselector();

            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECT_STATUS, this.props.params.id);
            }
            else {
                var value = $('#colorselector').val();
                $('#selected-color').css('background', value);
            }
        },

        componentDidUpdate: function (props) {
            if (this.props.params.id && setColor === 0) {
                setColor = 1;
                var color = this.props.selectedItem.projectStatus.color;

                $('.btn-colorselector').css('background-color', color);
                $('#colorselector').val(color).selected = true;
                $('#selected-color').css('background-color', color);

                $('#colorselector').next().find('ul li .selected').removeClass('selected');
                $('#colorselector').next().find("ul li a[data-color='" + color + "']").addClass('selected');
            }
        },

        componentWillUnmount: function () {
            flag = 0;
            this.props.actions.clearSelectedItem(resourceConstant.PROJECT_STATUS);
        },

        //called when form is submitted
        saveProjectStatus: function (event) {
            event.preventDefault();

            var projectStatus = {
                title: this.refs.title.value,
                color: this.refs.color.value
            }

            var requiredField = {
                title: this.refs.title.value
            }

            formValidator.validateForm(requiredField);

            if (formValidator.isValid()) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.PROJECT_STATUS, projectStatus, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECT_STATUS, projectStatus);
                }
            } else {
                Toastr.error(messageConstant.FORM_INVALID_SUBMISSION_MESSAGE, messageConstant.TOATSTR_INVALID_HEADER);
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
                                <label>Project Status *</label>
                                <input type="text" ref="title" name="title"
                                       value={this.props.selectedItem.projectStatus.title}
                                       onChange={this.handleChange}
                                       onBlur={formValidator.validateField}
                                       onFocus={formValidator.removeError.bind(null, 'title')}
                                       placeholder="Project Status"
                                       className="form-control"
                                       id="title"/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group clearfix">
                                <div className="row multiple-element">
                                    <div className="col-md-4 col-lg-2 element">
                                        <label>Color</label>
                                        <select id="colorselector" ref="color" name="color">
                                            <option value="#F44336" data-color="#F44336">red</option>
                                            <option value="#4CAF50" data-color="#4CAF50">green</option>
                                            <option value="#3F51B5" data-color="#3F51B5">blue</option>
                                            <option value="#FF5722" data-color="#FF5722">orange</option>
                                            <option value="#FF8C00" data-color="#FF8C00">darkorange</option>
                                            <option value="#DC143C" data-color="#DC143C">crimson</option>
                                            <option value="#FF00FF" data-color="#FF00FF">purple</option>
                                            <option value="#C71585" data-color="#C71585">mediumvioletred</option>
                                            <option value="#A0522D" data-color="#A0522D">sienna</option>
                                            <option value="#000000" data-color="#000000">black</option>
                                        </select>
                                    </div>
                                    <div className="col-md-8 element">
                                        <label>Preview :</label>
                                        <span className="label text-uppercase"
                                              id="selected-color">{this.props.selectedItem.projectStatus.title}</span>
                                    </div>
                                </div>
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
            selectedItem: state.crudReducer.selectedItem,
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusForm)
})();