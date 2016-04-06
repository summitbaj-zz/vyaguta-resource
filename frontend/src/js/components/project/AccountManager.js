;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var messageConstant = require('../../constants/messageConstant');

    //components
    var apiUtil = require('../../util/apiUtil');
    var AutoComplete = require('../common/autocomplete/Autocomplete');

    var AccountManager = React.createClass({
        getInitialState: function () {
            return {
                suggestions: [],
                isAccountManagerValid: false,
                isRequesting: false
            }
        },

        changeSuggestionState: function (data) {
            this.setState({isRequesting: false});
            this.setState({suggestions: data || []});
        },

        updateSuggestions: function (input) {
            var that = this;
            this.setState({suggestions: []});
            this.setState({isRequesting: true});
            apiUtil.fetchByQueryFromCore(resourceConstant.EMPLOYEES, input, this.changeSuggestionState);
        },

        getSuggestionName: function () {
            var names = [];
            for (var i = 0; i < this.state.suggestions.length; i++) {
                names.push({id: this.state.suggestions[i].id, title: this.getAppendedName(i)});
            }
            return names;
        },

        setAccountManagerId: function (id) {
            if (id) {
                this.setState({isAccountManagerValid: true});
                var accountManager = {'id': id};
                this.props.setManager(accountManager);
                this.showValidity('has-success has-feedback');
            } else {
                this.setState({isAccountManagerValid: false});
                this.props.setManager(null);
                this.showValidity();
            }
        },

        getAppendedName: function (index) {
            var name;
            var suggestions = this.state.suggestions;
            name = suggestions[index].firstName;
            if (suggestions[index].middleName) {
                name = name.concat(' ', suggestions[index].middleName);
            }
            name = name.concat(' ', suggestions[index].lastName);
            return name;
        },

        showValidity: function (className) {
            var parentElement = $('#account-manager').parent().parent();
            parentElement.removeClass('has-success');
            parentElement.addClass(className);
            this.setState({suggestions: []});
        },

        render: function () {
            var suggestionTitle = this.getSuggestionName();
            return (
                <div className="col-md-6 col-lg-4 element">
                    <label>Account Manager</label>
                    <div className="manager-parent">
                        <input type="text" placeholder="Account Manager Name" ref="inputTag" id="account-manager"
                               className="form-control manager-input" autoComplete="off"
                               onBlur={this.checkName} id="account-manager"
                               onChange={this.props.fieldChange}
                        />
                        {this.state.isAccountManagerValid && <span
                            className="glyphicon glyphicon-ok form-control-feedback manager-validation-icon"
                            aria-hidden="true"></span>}

                        <AutoComplete inputField="manager-input" suggestions={suggestionTitle}
                                      generateSuggestions={this.updateSuggestions}
                                      isRequesting={this.state.isRequesting}
                                      setSelectedItemId={this.setAccountManagerId}
                                      isRestrictedToSuggestions={true}
                        />
                        <span className="help-block" ref="availableMessage"></span>
                    </div>

                </div>
            );
        }
    });
    module.exports = AccountManager;
})
();