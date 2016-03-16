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

    var ClientForm = React.createClass({
        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.CLIENTS, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.CLIENTS);
        },

        //called when form is submitted
        saveClient: function (event) {
            event.preventDefault();

            var client = {
                name: this.refs.name.value,
                email: this.refs.email.value,
                phone_no: this.refs.phone.value,
                skype: this.refs.skype.value,
                address: this.refs.address.value,
                description: this.refs.description.value
            };

            var requiredFields = {
                name: this.refs.name.value,
                email: this.refs.email.value
            };

            if (formValidator.isRequired(requiredFields)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.CLIENTS, client, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.CLIENTS, client);
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

            this.props.actions.updateSelectedItem(resourceConstant.CLIENTS, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Client':'Add Client'}
                                  routes={this.props.routes}/>
                    <div className="block">
                        <div className="block-title-border">Client Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveClient}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" ref="name" name="name"
                                       value={this.props.selectedItem.clients.name}
                                       onChange={this.fieldChange}
                                       placeholder="Client Name"
                                       className="form-control"
                                       id="name"/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group clearfix">
                                <div className="row multiple-element">
                                    <div className="col-md-6 col-lg-4 element">
                                        <label className="control-label">Email Address</label>
                                        <div>
                                            <input type="text" ref="email" name="email"
                                                   value={this.props.selectedItem.clients.email}
                                                   onChange={this.fieldChange}
                                                   placeholder="Email Address"
                                                   className="form-control"
                                                   id="email"/>
                                        </div>
                                        <span className="help-block" ref="availableMessage"></span>
                                    </div>
                                    <div className="col-md-6 col-lg-4 element">
                                        <label className="control-label">Phone Number</label>
                                        <div>
                                            <input type="text" ref="phone" name="phone"
                                                   value={this.props.selectedItem.clients.phone}
                                                   onChange={this.fieldChange}
                                                   placeholder="Phone Number"
                                                   className="form-control"
                                                   id="phone"/>
                                        </div>
                                        <span className="help-block" ref="availableMessage"></span>
                                    </div>
                                    <div className="col-md-6 col-lg-4 element">
                                        <label className="control-label">Skype Id</label>
                                        <div>
                                            <input type="text" ref="skype" name="skype"
                                                   value={this.props.selectedItem.clients.skype}
                                                   onChange={this.fieldChange}
                                                   placeholder="Skype Id"
                                                   className="form-control"
                                                   id="skype"/>
                                        </div>
                                        <span className="help-block" ref="availableMessage"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" ref="address" name="address"
                                       value={this.props.selectedItem.clients.address}
                                       onChange={this.fieldChange}
                                       placeholder="Address"
                                       className="form-control"
                                       id="address"/>
                                <span className="help-block" ref="availableMessage"></span>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                    <textarea name="description" ref="description"
                                              value={this.props.selectedItem.clients.description}
                                              placeholder="Short description about the client."
                                              onChange={this.fieldChange}
                                              className="form-control" rows="4" id="description"></textarea>
                                <span className="help-block" ref="availableMessage"></span>

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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ClientForm);

})();