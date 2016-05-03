;(function () {
    'use-strict';

    //React Dependencies
    var React = require('react');

    var selectedIndex = -1;
    var typingTimer;

    var AutoComplete = React.createClass({
        getInitialState: function () {
            return {
                suggestions: [],
                selected: false,
                selectedId: null
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
            var input = document.getElementsByClassName(this.props.inputField)[0];

            if (this.props.isRestrictedToSuggestions) {
                if (!this.state.selected) {
                    input.value = '';
                    this.props.setSelectedItemId(null);
                } else {
                    this.props.setSelectedItemId(this.state.selectedId);
                }
                input.blur();
            }
            this.setState({suggestions: []});
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
                if (this.isValidKey(event)) {
                    this.setState({selected: false});
                }
            }
        },

        arrowKeyPressed: function (key) {
            console.log(key)
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
                this.setInputValue(this.state.suggestions[selectedIndex].title);
                this.setState({selectedId: this.state.suggestions[selectedIndex].id});
                this.removeHoverState();
                this.setState({selected: true});
            }
            this.focusOut();
        },

        generateSuggestions: function (event) {
            var that = this;
            var pressed = String.fromCharCode(event.keyCode);
            var inputValue = event.target.value;

            if (inputValue && that.isValidKey(event)) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(function () {
                    that.props.generateSuggestions(inputValue);
                }, 200);
            } else if (!inputValue) {
                this.setState({suggestions: []});
            }
        },

        isValidKey: function (event) {
            var inputValue = event.target.value;
            if ((event.keyCode > 47 && event.keyCode < 112) || (event.keyCode > 185) || (event.keyCode === 8 || event.keyCode === 46 && inputValue)) {
                return true;
            } else {
                return false;
            }
        },

        setInputValue: function (value) {
            var input = document.getElementsByClassName(this.props.inputField)[0];
            input.value = value;
        },

        listSuggestions: function (value) {
            return (
                <div className='suggestion' key={value}
                     onMouseDown={this.suggestionClicked.bind(null, this.state.suggestions[value])}
                     onMouseOver={this.suggestionHovered.bind(null, value)}>{this.state.suggestions[value].title}</div>
            );
        },

        suggestionClicked: function (suggestions) {
            this.setInputValue(suggestions.title);
            this.setState({selected: true});
            selectedIndex = -1;
            this.setState({suggestions: []});
            this.setState({selectedId: suggestions.id});
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
                var suggestionItem = nextSuggestions[i].title.toLowerCase();
                var matchIndex = suggestionItem.search(inputValue.toLowerCase());
                if (matchIndex > -1) {
                    suggestions.push(nextSuggestions[i]);
                }
            }
            this.setState({suggestions: suggestions});
        },

        getSuggestionTitles: function () {
            var titles = [];
            for (var i = 0; i < this.state.suggestions.length; i++) {
                titles.push(this.state.suggestions[i].title);
            }
            return titles;
        },

        render: function () {
            var suggestionId = Object.keys(this.getSuggestionTitles());
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