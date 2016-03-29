;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //components
    var ApiUtil = require('../../util/apiUtil');
    var Tagging = require('../common/tag/Tagging');
    var resourceConstant = require('../../constants/resourceConstant');

    var TechnologyStack = React.createClass({
        getInitialState: function () {
            return {
                tags: [],
                suggestions: [],
                isRequesting: false
            }
        },

        componentWillReceiveProps: function (nextProps) {
            this.setState({tags: this.getTitle(nextProps.technologyStack)});
        },

        getTitle: function (tags) {
            var tagTitle = [];
            var technologyStack = tags || [];
            for (var i = 0; i < technologyStack.length; i++) {
                tagTitle[i] = technologyStack[i].title;
            }
            return tagTitle;
        },

        changeTagState: function (data) {
            this.setState({isRequesting: false});
            this.setState({suggestions: data});
        },

        updateSuggestions: function (input) {
            var that = this;
            this.setState({isRequesting: true});
            this.setState({suggestions: []});
            setTimeout(function(){
                ApiUtil.fetchByQuery(resourceConstant.TAGS, input, that.changeTagState, 'any');
            }, 4000);

        },

        addTag: function (tag) {
            this.setState({isRequesting: false});
            var suggestions = this.state.suggestions || [];
            for (var i = 0; i < suggestions.length; i++) {
                if (tag == suggestions[i].title) {
                    this.props.addTag(suggestions[i]);
                    return;
                }
            }
            this.props.addTag({title: tag});
        },

        render: function () {
            var suggestionTitles = this.getTitle(this.state.suggestions);
            return (
                <Tagging tags={this.state.tags} suggestions={suggestionTitles}
                         removeTag={this.props.removeTag} addTag={this.addTag}
                         updateSuggestions={this.updateSuggestions} isRequesting={this.state.isRequesting}/>
            );
        }
    });
    module.exports = TechnologyStack;
})();