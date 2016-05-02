;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //component
    var BookedResourceItem = require('./BookedResourceItem');

    //util
    var dashboardUtil = require('../../../util/dashboardUtil');

    var BookedResource = React.createClass({
        renderResourceByProjectType: function (total, key) {
            return (<BookedResourceItem resource={this.props.resource[key]} key={key} total={total}/>);
        },

        displayNoRecordFound: function () {
            return (<div className="not-found-message">No records found.</div>);
        },

        render: function () {
            var totalResource = dashboardUtil.calculateTotalResource(this.props.resource);
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="widget">
                            <div className="widget-extra widget-custom">
                                <div className="widget-title">Booked Resources</div>
                            </div>
                            <div className="widget-extra-full">
                                <div className="row">
                                    {this.props.resource.length ? Object.keys(this.props.resource).map(this.renderResourceByProjectType.bind(null, totalResource)) : this.displayNoRecordFound()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    module.exports = BookedResource;
})();
