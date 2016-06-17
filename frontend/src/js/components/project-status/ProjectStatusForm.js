
;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstants = require('../../constants/resourceConstants');
    var urlConstants = require('../../constants/urlConstants');
    var messageConstants = require('../../constants/messageConstants');

    //components
    var EntityHeader = require('../common/header/EntityHeader');

    //utils
    var formValidator = require('../../utils/formValidator');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    var setColorFlag = 0;

    var ProjectStatusForm = React.createClass({
        componentDidMount: function () {
            $('#colorselector').colorselector();

            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstants.PROJECT_STATUS, this.props.params.id);
            }
            else {
                var value = $('#colorselector').val();
                $('#selected-color').css('background', value);
            }
        },

        componentDidUpdate: function (props) {
            if (this.props.params.id && setColorFlag <= 2) {
                setColorFlag++;
                var color = this.props.selectedItem.projectStatus.color;

                $('.btn-colorselector').css('background-color', color);
                $('#selected-color').css('background-color', color);

                $('#colorselector').next().find('ul li .selected').removeClass('selected');
                $('#colorselector').next().find("ul li a[data-color='" + color + "']").addClass('selected');
            }
        },

        componentWillUnmount: function () {
            setColorFlag = 0;
            this.props.actions.clearSelectedItem(resourceConstants.PROJECT_STATUS);
            this.props.actions.apiClearState();
        },

        //called when form is submitted
        saveProjectStatus: function (event) {
            event.preventDefault();
            var projectStatus = _.cloneDeep(this.props.selectedItem.projectStatus);

            var requiredField = {
                title: this.refs.title.value
            }

            if (formValidator.isValid(requiredField)) {
                projectStatus.color = this.refs.color.value;
                this.props.actions.submitForm(resourceConstants.PROJECT_STATUS, projectStatus, this.props.params.id);
            } else {
                Toastr.error(messageConstants.FORM_INVALID_SUBMISSION_MESSAGE, messageConstants.TOASTR_INVALID_HEADER);
            }
        },

        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;
            this.props.actions.updateSelectedItem(resourceConstants.PROJECT_STATUS, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project Status':'Add Project Status'}
                                  routes={this.props.routes}
                                  title={this.props.selectedItem.projectStatus.title || 'Project Status'}
                                  apiState={this.props.apiState}/>
                    <div className="block">
                        <div className="block-title-border">Project Status Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectStatus}>
                            <fieldset disabled={this.props.apiState.isRequesting}>
                                <div className="form-group">
                                    <label>Project Status *</label>
                                    <input type="text" ref="title" name="title"
                                           value={this.props.selectedItem.projectStatus.title}
                                           onChange={this.handleChange}
                                           placeholder="Project Status"
                                           onBlur={formValidator.validateField}
                                           onFocus={formValidator.removeFeedback.bind(null, 'title')}
                                           className="form-control"
                                           id="title"
                                           maxLength="50"
                                    />
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="row multiple-element">
                                        <div className="col-md-4 col-lg-2 element">
                                            <label>Color</label>
                                            <select id="colorselector" ref="color" name="color" value={this.props.selectedItem.projectStatus &&
                                                                                                   this.props.selectedItem.projectStatus.color}>
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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusForm);

})();