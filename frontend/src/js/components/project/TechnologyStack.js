var React = require('react');


var ApiUtil = require('../../util/ApiUtil');
var AutoComplete = require('./Autocomplete');

var TechnologyStack = React.createClass({
        getInitialState: function () {
            return {
                technologyStack: [],
                suggestions: []
            }
        },

        checkTag: function (value) {
            var techStack = this.state.technologyStack;
            for (var i = 0; i < techStack.length; i++) {
                if (techStack[i].toLowerCase() == value.toLowerCase()) {
                    return i;
                }
            }
            return null;
        },

        addNewTag: function (value) {
            this.state.technologyStack.push(value);
            this.setState({technologyStack: this.state.technologyStack});
        },

        removeTag: function (tag) {
            var techStack = this.state.technologyStack;
            var index = this.checkTag(tag);
            if (index != null) {
                techStack.splice(index, 1);
            }
            this.setState({technologyStack: techStack});
        },

        changeTagState: function (data) {
            this.setState({suggestions: data.names});
            document.getElementsByClassName('autocomplete-suggestions')[0].style.display = 'block';
        },

        updateSuggestions: function (input) {
            this.setState({suggestions: []});
            document.getElementsByClassName('autocomplete-suggestions')[0].style.display = 'none';
            ApiUtil.fetchById('technologyStacks', input, this.changeTagState);
        },
        autoFocus: function () {
            this.refs.inputTag.focus();
        },

        inputTag: function (event) {
            var inputValue = this.refs.inputTag.value;
            var techStack = this.props.technologyStack;
            var key = event.keyCode;

            if (key == 13) {
                event.preventDefault();
                this.enterKeyPressed();
            } else if (key == 8) {
                this.backSpacePressed();
            } else if (key == 32 && !inputValue) {
                event.preventDefault();
            } else {
                var pressed = String.fromCharCode(key);
                var valid = pressed.match(/[a-zA-Z0-9 .-]+/);

                if (valid) {
                    inputValue = inputValue + pressed;
                    this.props.updateSuggestions(inputValue.toLowerCase());
                }
            }
        },

        enterKeyPressed: function () {
            var inputValue = this.refs.inputTag.value;

            if (inputValue) {
                if (this.props.checkTag(inputValue) == null) {
                    console.log(inputValue);
                    this.props.addNewTag(inputValue);
                }
                this.refs.inputTag.value = '';
            }
            this.refs.suggestions.style.display = 'none';
        },

        backSpacePressed: function () {
            var techStack = this.props.technologyStack;
            this.props.updateSuggestions(this.refs.inputTag.value.toLowerCase());
            if (!this.refs.inputTag.value && techStack.length > 0) {
                this.props.removeTag(techStack[techStack.length - 1]);
            }
        },

        renderTag: function (value) {
            return (
                <li className="newtag" key={value}>
                <span className="label label-blue-grey">
                    <label>{value}</label>
                    <i className="fa fa-close" onClick={this.props.removeTag.bind(null, value)}></i>
                </span>
                </li>
            );
        },



        render: function () {

            return (
                <div
                    className="form-control tag-wrapper"
                    onClick={this.autoFocus}>
                    <ul id="tag-list" className="clearfix">
                        {this.props.technologyStack.map(this.renderTag)}
                        <li className="newtag-input"><input type="text" ref="inputTag" onKeyDown={this.inputTag}
                                                            onBlur={this.focusOut}
                                                            className="input-tag"/>
                            <AutoComplete inputField="input-tag" suggestions={this.props.suggestions}/>
                        </li>
                    </ul>
                </div>
            );
        }

    })
    ;
module.exports = TechnologyStack;