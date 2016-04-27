/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/14/16.
 */

;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //components
    var d3Chart = require('../../util/charts/d3Chart');
    var ApiUtil = require('../../util/apiUtil');
    var ReactDOM = require('react-dom');

    //util
    var convertContractHash = require('../../util/convertContractHash');

    var TimelineChart = React.createClass({
        componentWillReceiveProps: function () {
            var element = $('#timelineChart')[0];
            var width = this.props.width;
            if(this.props.data) {
                console.log(this.props.data);
                var data = convertContractHash.toTimelineHash(this.props.data);
                console.log(data);
                d3Chart.create(element, {'width': width}, data);
            }
        },

        render: function () {
            return (
                <div className="col-sm-12">
                    <div className="block full">
                        <div className="block-title">
                            <h2>Timeline</h2>
                        </div>
                        <div className="block-content">
                            <div id="timelineChart">
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = TimelineChart;
})();