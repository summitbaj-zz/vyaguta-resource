;(function () {
    'use-strict';

    var React = require('react');

    var ApiUtil = require('../../util/ApiUtil');
    var AutoComplete = require('./Autocomplete');
    var AUTOCOMPLETE_CLASS = 'autocomplete-suggestions';

    var resourceConstant = require('../../constants/resourceConstant');

    var AccountManager = React.createClass({
            getInitialState: function () {
                return {
                    suggestions: []
                }
            },

            changeSuggestionState: function (data) {
                this.setState({suggestions: data});
                document.getElementsByClassName(AUTOCOMPLETE_CLASS)[0].style.display = 'block';
            },

            updateSuggestions: function (input) {
                this.setState({suggestions: []});
                document.getElementsByClassName(AUTOCOMPLETE_CLASS)[0].style.display = 'block';
                ApiUtil.fetchByQuery(resourceConstant.ACCOUNT_MANAGERS, input, this.changeSuggestionState);
            },

            input: function (event) {
                var key = event.keyCode;

                if (key == 13) {
                    event.preventDefault();
                } else if (key == 32 && !this.refs.inputTag.value) {
                    event.preventDefault();
                } else {
                    var inputValue = this.refs.inputTag.value;
                    var pressed = String.fromCharCode(key);

                    inputValue += pressed;
                    this.updateSuggestions(inputValue.toLowerCase());

                }
            },
            getSuggestionName: function () {
                var names = [];
                for (var i = 0; i < this.state.suggestions.length; i++) {
                    names.push(this.state.suggestions[i].firstName);
                }
                return names;
            },

            validateManager: function () {
                var input = this.refs.inputTag;
                for (var i = 0; i < this.state.suggestions.length; i++) {
                    if (input.value === this.state.suggestions[i].firstName) {
                        input.parentElement.parentElement.className = 'col-md-6 col-lg-4 element has-success';
                        this.props.setIsManagerValid(true);
                        this.refs.availableMessage.innerHTML = 'Valid name';
                        return;
                    }
                }
                input.parentElement.parentElement.className += ' has-error';
                this.props.setIsManagerValid(false);
                this.refs.availableMessage.innerHTML = 'Invalid name';
            }

            ,


            render: function () {
                var suggestionName = this.getSuggestionName();
                return (
                    <div className="col-md-6 col-lg-4 element">
                        <label className="control-label">Account Manager</label>
                        <div className="manager-parent">
                            <input type="text" placeholder="Account Manager Name" ref="inputTag"
                                   className="form-control manager-input" onKeyDown={this.input}
                                   onBlur={this.validateManager} id="account-manager"/>
                            <AutoComplete inputField="manager-input" suggestions={suggestionName}/>
                        </div>
                        <span className="help-block" ref="availableMessage"></span>
                    </div>
                );
            }
        })
        ;
    module.exports = AccountManager;
})
();