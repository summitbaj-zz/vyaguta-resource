;(function () {
    'use-strict';

    //React Dependencies
    var React = require('react');

    var selectedIndex = -1;
    var typingTimer;

    var AutoComplete = React.createClass({
        getInitialState: function () {
            return {
                suggestions: []
            }
        },
        componentDidMount: function () {
            var input = document.getElementsByClassName(this.props.inputField)[0];

            input.addEventListener('keydown', this.keyPressed);
            input.addEventListener('keyup', this.generateSuggestions);
            input.addEventListener('blur', this.focusOut);
        },

        focusOut: function () {
            selectedIndex = -1;
        },

        getSelectedIndex: function () {
            return selectedIndex;
        },

        setSelectedIndex: function (index) {
            selectedIndex = index;
        },

        componentWillReceiveProps: function (nextProps) {
            selectedIndex = -1;

            this.getMatchingSuggestions(nextProps.suggestions);
        },

        showSuggestions: function () {
            var input = document.getElementsByClassName(this.props.inputField)[0];
            if (this.state.suggestions.length && input.value && $(input).is(':focus')) {
                return true;
            } else {
                return false;
            }
        },

        keyPressed: function (event) {
            clearTimeout(typingTimer);
            var key = event.keyCode;
            if (this.props.suggestions.length && (key === 40 || key === 38)) {
                event.preventDefault();
                this.arrowKeyPressed(key);
            } else if (key === 13) {
                event.preventDefault();
                this.enterKeyPressed();
            } else {
                this.setState({suggestions: []});
            }
        },

        arrowKeyPressed: function (key) {
            var suggestions = this.refs.suggestions.childNodes;
            if (key === 38) {
                if (selectedIndex == 0 || selectedIndex == -1) {
                    selectedIndex = suggestions.length - 1;
                } else {
                    selectedIndex -= 1;
                }
            } else if (key === 40) {
                if (selectedIndex == suggestions.length - 1) {
                    selectedIndex = 0;
                } else {
                    selectedIndex += 1;
                }
            }
            this.removeHoverState();
            suggestions[selectedIndex].className = 'suggestion hover';
        },

        removeHoverState: function () {
            for (var i = 0; i <= this.refs.suggestions.childNodes.length - 1; i++) {
                this.refs.suggestions.childNodes[i].className = 'suggestion';
            }
        },

        enterKeyPressed: function () {
            if (selectedIndex > -1) {
                this.setInputValue(this.props.suggestions[selectedIndex]);
                this.removeHoverState();
            }
            selectedIndex = -1;

        },

        generateSuggestions: function (event) {
            clearTimeout(typingTimer);
            var that = this;
            typingTimer = setTimeout(function () {
                var pressed = String.fromCharCode(event.keyCode);
                var inputValue = event.target.value;
                if (inputValue && ((event.keyCode > 47 && event.keyCode < 112) || (event.keyCode > 185) || (event.keyCode === 8 || event.keyCode === 46 && inputValue))) {
                    that.props.generateSuggestions(inputValue.toLowerCase());
                }
            }, 200);
        },

        setInputValue: function (value) {
            var input = document.getElementsByClassName(this.props.inputField)[0];
            input.value = value;
        },

        listSuggestions: function (value) {
            return (
                <div className='suggestion' key={value}
                     onMouseDown={this.suggestionClicked.bind(null, this.state.suggestions[value])}
                     onMouseOver={this.suggestionHovered.bind(null, value)}>{this.state.suggestions[value]}</div>
            );
        },

        suggestionClicked: function (value) {
            this.setInputValue(value);
        },


        suggestionHovered: function (key) {
            this.removeHoverState();
            selectedIndex = parseInt(key);
            this.refs.suggestions.childNodes[selectedIndex].className = 'suggestion hover';
        },

        getMatchingSuggestions: function (nextSuggestions) {
            var input = document.getElementsByClassName(this.props.inputField)[0];
            var inputValue = input && input.value;
            var suggestions = [];

            for (var i = 0; i < nextSuggestions.length; i++) {
                var matchIndex = nextSuggestions[i].search(inputValue);
                if (matchIndex > -1) {
                    suggestions.push(nextSuggestions[i]);
                }
            }
            this.setState({suggestions: suggestions});
        },

        render: function () {
            var suggestionId = Object.keys(this.state.suggestions);
            var isRequesting = this.props.isRequesting || false;
            return (
                <div>
                    {isRequesting && <span
                        className="form-control-feedback manager-validation-icon"
                        aria-hidden="true"> <img src="img/ajax-loader-3.gif"/></span>}
                    {this.showSuggestions() && <div className="autocomplete-suggestions" ref="suggestions">
                        {suggestionId.map(this.listSuggestions)}
                    </div>}
                </div>

            )
        }
    });
    module.exports = AutoComplete;
})();
