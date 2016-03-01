;(function () {
    'use-strict';

    var React = require('react');

    var ApiUtil = require('../../util/ApiUtil');
    var AutoComplete = require('./Autocomplete');

    var AccountManager = React.createClass({
        getInitialState: function () {
            return {
                suggestions: ['hari', 'ram']
            }
        },
        changeTagState: function (data) {
            // this.setState({suggestions: data.names});
            document.getElementsByClassName('autocomplete-suggestions')[0].style.display = 'block';
        },

        updateSuggestions: function (input) {
            //this.setState({suggestions: []});

            //change back to none
            document.getElementsByClassName('autocomplete-suggestions')[0].style.display = 'block';
            //ApiUtil.fetchById('technologyStacks', input, this.changeTagState);
        },
        inputTag: function (event) {
            var key = event.keyCode;

            if (key == 13) {
                event.preventDefault();
                //this.enterKeyPressed();
            } else if (key == 8) {
                //this.backSpacePressed();
            } else if (key == 32 && !this.refs.inputTag.value) {
                event.preventDefault();
            } else {
                var inputValue = this.refs.inputTag.value;
                var pressed = String.fromCharCode(key);

                //if (this.isValid(pressed)) {
                // inputValue += pressed;
                this.updateSuggestions(inputValue.toLowerCase());
                //}
            }
        },
        /*
         isValid: function (pressed) {
         return (pressed.match(/[a-zA-Z0-9 .-]+/));

         },*/

        render: function () {
            return (
                <div className="col-md-6 col-lg-4 element">
                    <label className="control-label">Account Manager</label>
                    <div className="manager-parent">
                        <input type="text" placeholder="Account Manager Name" ref="inputTag"
                               className="form-control manager-input" onKeyDown={this.inputTag}/>
                        <AutoComplete inputField="manager-input" suggestions={this.state.suggestions}/>
                    </div>
                </div>
            );
        }
    });
    module.exports = AccountManager;
})();