;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //util
    var dashboardUtil = require('../../../util/dashboardUtil');

    var BookedResourceItem = React.createClass({
        getClassName: function (resource) {
            switch (resource.projectType) {
                case 'Services':
                    return 'fa fa-cogs';
                case 'Product':
                    return 'fa fa-cubes';
                default:
                    return 'icomoon icon-project';
            }
        },

        render: function () {
            var resource = this.props.resource;
            var total = this.props.total;

            var totalResource = resource.billed + resource.unbilled || null;
            var classNameForIcon = this.getClassName(resource);
            var classNameForStatTitle = totalResource ? 'stat-title' : 'stat-title v-align-middle';
            return (
                <div className="col-sm-6 col-md-4">
                    <div className="stat-block">
                        <div className={classNameForStatTitle}>
                            <span className="stat-label"><i
                                className={classNameForIcon}></i>{resource.projectType}</span>
                            <span
                                className="color-lg-blue">{dashboardUtil.calculatePercentage(resource.numberOfProjects, total)}</span>
                        </div>
                        {totalResource &&
                        <div className="stat-details clearfix">
                            <div className="col-xs-6">
                                <span className="stat-label">Billed</span>
                                <div className="row breakdown">
                                    <span className="side-text clear">Percentage:
                                        <span
                                            className="color-lg-blue pull-right">{dashboardUtil.calculatePercentage(resource.billed, totalResource)}</span>
                                    </span>
                                    <span className="side-text clear">Total:
                                        <span className="color-lg-blue pull-right">{resource.billed}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <span className="stat-label">Unbilled</span>
                                <div className="row breakdown">
                                    <span className="side-text clear">Percentage:
                                        <span
                                            className="color-lg-blue pull-right">{dashboardUtil.calculatePercentage(resource.unbilled, totalResource)}</span>
                                    </span>
                                    <span className="side-text clear">Total:
                                        <span className="color-lg-blue pull-right">{resource.unbilled}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            );
        }
    });
    module.exports = BookedResourceItem;
})();