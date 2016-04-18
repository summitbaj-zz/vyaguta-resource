;(function () {
    'use-strict';
    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var HistoryItem = require('./HistoryItem');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');

    //actions
    var historyActions = require('../../actions/historyActions');

    //libraries
    var _ = require('lodash');

    //util
    var historyUtil = require('../../util/historyUtil');

    var History = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAllHistories(resourceConstant.PROJECTS, this.props.params.id);
        },

        componentWillUnmount: function () {
            this.props.actions.clearHistory();
        },

        renderHistoryItems: function (key) {
            return (
                <HistoryItem history={historyUtil.convertHistoryJSON(this.props.histories[key])} key={key}/>
            );
        },

        render: function () {
            var historyIds = Object.keys(this.props.histories);
            return (
                <div>
                    <EntityHeader header="History" routes={this.props.routes} title="History"/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block clearfix">
                                <div className="block full">
                                    <div className="block-title">
                                        <h2>History</h2>
                                    </div>
                                    <div className="timeline block-content-full">
                                        <ul className="timeline-list timeline-hover">
                                            {historyIds.map(this.renderHistoryItems)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    var mapStateToProps = function (state) {
        return {
            histories: state.historyReducer.project
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, historyActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(History);
})();
