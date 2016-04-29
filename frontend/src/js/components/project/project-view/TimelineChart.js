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
    var d3Chart = require('../../../util/charts/d3Chart');
    var ApiUtil = require('../../../util/apiUtil');
    var ReactDOM = require('react-dom');
    //util
    var convertContractHash = require('../../../util/convertContractHash');

    var isDrawn  = false;

    var TimelineChart = React.createClass({
        drawChart: function (width, data) {
            if (data && data.length && !isDrawn) {
                var element = $('#timelineChart')[0];
                var width = width;
                var data = convertContractHash.toTimelineHash(data);
                d3Chart.create(element, {'width': width}, data);
                isDrawn = true;
            }
        },
        
        componentWillUnmount: function() {
            isDrawn = false;
        },

        render: function () {
            this.drawChart(this.props.width, this.props.data);
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