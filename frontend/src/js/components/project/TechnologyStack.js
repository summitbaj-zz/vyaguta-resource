;(function () {
    'use-strict';

    var React = require('react');
    var ApiUtil = require('../../util/ApiUtil');
    var Tagging = require('./Tagging');

    var TechnologyStack = React.createClass({
        getInitialState: function () {
            return {
                tags: [],
                suggestions: []
            }
        },

        componentWillReceiveProps: function (props) {
            this.setState({tags: this.getTitle(this.props.technologyStack)});
        },

        getTitle: function (technologyStack) {
            var tagTitle = [];
            for (var i = 0; i < technologyStack.length; i++) {
                tagTitle[i] = technologyStack[i].title;
            }
            return tagTitle;
        },

        changeTagState: function (data) {
            var suggestionTitle = this.getTitle(data);
            this.setState({suggestions: suggestionTitle});
        },

        updateSuggestions: function (input) {
            this.setState({suggestions: []});
            console.log('called');
            ApiUtil.fetchByQuery(input, this.changeTagState);
        },

        render: function () {
            return (
                <Tagging tags={this.state.tags} suggestions={this.state.suggestions}
                         removeTag={this.props.removeTag} addNewTag={this.props.addNewTag}
                         updateSuggestions={this.updateSuggestions}/>
            );
        }
    });
    module.exports = TechnologyStack;
})();