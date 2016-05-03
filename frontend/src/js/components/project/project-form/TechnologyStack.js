;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //components
    var apiUtil = require('../../../util/apiUtil');
    var Tagging = require('../../common/tag/Tagging');
    var resourceConstant = require('../../../constants/resourceConstants');

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
            var tag = [];
            var technologyStack = tags || [];
            for (var i = 0; i < technologyStack.length; i++) {
                tag[i] = {id: technologyStack[i].id, title: technologyStack[i].title};
            }
            return tag;
        },

        updateSuggestions: function (input) {
            var that = this;
            that.setState({isRequesting: true});

            apiUtil.fetchByQuery(resourceConstant.TAGS, input).then(function (response) {
                    that.setState({isRequesting: false});
                    that.setState({suggestions: response.body.data});
                },
                function (error) {
                    that.setState({isRequesting: false});
                });
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