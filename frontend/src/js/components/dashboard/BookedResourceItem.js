;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var BookedResourceItem = React.createClass({
        calculatePercentage(number, total){
            var percentage = (number / total) * 100 || 0;
            return Math.round(percentage * 100) / 100 + '%';
        },

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

        render: function(){
            var resource = this.props.resource;
            var total = this.props.total;
            console.log('asdf', resource);

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
                                className="color-lg-blue">{this.calculatePercentage(resource.numberOfProjects, total)}</span>
                        </div>
                        {totalResource &&
                        <div className="stat-details clearfix">
                            <div className="col-xs-6">
                                <span className="stat-label">Billed</span>
                                <div className="row breakdown">
                                    <span className="side-text clear">Percentage:
                                        <span className="color-lg-blue">{this.calculatePercentage(resource.billed, totalResource)}</span>
                                    </span>
                                    <span className="side-text clear">No.of:
                                        <span className="color-lg-blue">{resource.billed}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <span className="stat-label">Unbilled</span>
                                <div className="row breakdown">
                                    <span className="side-text clear">Percentage:
                                        <span
                                            className="color-lg-blue">{this.calculatePercentage(resource.unbilled, totalResource)}</span>
                                    </span>
                                    <span className="side-text clear">No.of:
                                        <span className="color-lg-blue">{resource.unbilled}</span>
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