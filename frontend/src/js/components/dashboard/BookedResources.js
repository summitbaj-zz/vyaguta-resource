;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var BookedResources = React.createClass({
    render: function(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="widget">
                        <div className="widget-extra widget-custom">
                            <div className="widget-title">Booked Resources</div>
                        </div>
                        <div className="widget-extra-full">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <div className="stat-block">
                                        <div className="stat-title">
                                            <span className="stat-label"><i className="fa fa-cogs"></i>Services</span>
                                            <span className="color-lg-blue">50%</span>
                                        </div>
                                        <div className="stat-details clearfix">
                                            <div className="col-xs-6">
                                                <span className="stat-label">Billed</span>
                                                <div className="row breakdown">
                                                            <span className="side-text clear">Percentage: <span
                                                                className="color-lg-blue">75%</span></span>
                                                            <span className="side-text clear">No.of: <span
                                                                className="color-lg-blue">40</span></span>
                                                </div>
                                            </div>
                                            <div className="col-xs-6">
                                                <span className="stat-label">Unbilled</span>
                                                <div className="row breakdown">
                                                            <span className="side-text clear">Percentage: <span
                                                                className="color-lg-blue">25%</span></span>
                                                            <span className="side-text clear">No.of: <span
                                                                className="color-lg-blue">10</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <div className="stat-block">
                                        <div className="stat-title">
                                            <span className="stat-label"><i className="fa fa-cubes"></i>Product</span>
                                            <span className="color-lg-blue"> 25%</span>
                                        </div>
                                        <div className="stat-details clearfix">
                                            <div className="col-xs-6">
                                                <span className="stat-label">Billed</span>
                                                <div className="row breakdown">
                                                            <span className="side-text clear">Percentage: <span
                                                                className="color-lg-blue">75%</span></span>
                                                            <span className="side-text clear">No.of: <span
                                                                className="color-lg-blue">40</span></span>
                                                </div>
                                            </div>
                                            <div className="col-xs-6">
                                                <span className="stat-label">Unbilled</span>
                                                <div className="row breakdown">
                                                            <span className="side-text clear">Percentage: <span
                                                                className="color-lg-blue">75%</span></span>
                                                            <span className="side-text clear">No.of: <span
                                                                className="color-lg-blue">40</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <div className="stat-block">
                                        <div className="stat-title v-align-middle">
                                                    <span className="stat-label"><i
                                                        className="icomoon icon-project"></i>Internal</span>
                                            <span className="color-lg-blue">25%</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    });
    module.exports = BookedResources;
})();
