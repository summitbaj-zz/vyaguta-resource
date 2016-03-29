;(function () {
    'use-strict';

    //React Dependencies
    var React = require('react');

    var selectedIndex = -1;
    var typingTimer;
    var numberOfRequests = 0;

    var AutoComplete = React.createClass({
        componentDidMount: function () {
            var input = document.getElementsByClassName(this.props.inputField)[0];

            input.addEventListener('keydown', this.keyPressed);
            input.addEventListener('keyup', this.generateSuggestions);
            input.addEventListener('blur', this.focusOut);
        },

        focusOut: function () {
            this.refs.suggestions.style.display = 'none';
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
            numberOfRequests--;

            var input = document.getElementsByClassName(nextProps.inputField)[0];
            if (nextProps.suggestions.length && input.value && $(input).is(':focus')) {
                this.refs.suggestions.style.display = 'block';
            } else {
                this.refs.suggestions.style.display = 'none';
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
                this.refs.suggestions.style.display = 'none';
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
            this.refs.suggestions.style.display = 'none';
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
                     onMouseDown={this.suggestionClicked.bind(null, this.props.suggestions[value])}
                     onMouseOver={this.suggestionHovered.bind(null, value)}>{this.props.suggestions[value]}</div>
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

        render: function () {
            var suggestionId = Object.keys(this.props.suggestions);
            var isRequesting = this.props.isRequesting || false;
            return (
                <div>
                    {isRequesting && <span
                        className="form-control-feedback manager-validation-icon"
                        aria-hidden="true"> <img src="img/ajax-loader-3.gif"/></span>}
                    <div className="autocomplete-suggestions" ref="suggestions">
                        {suggestionId.map(this.listSuggestions)}
                    </div>
                </div>

            )
        }
    });
    module.exports = AutoComplete;
})();
