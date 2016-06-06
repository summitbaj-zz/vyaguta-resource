;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var Dashboard = React.createClass({
        render: function () {
            return (
                <div id="page-content" className="page-content">
                    <div className="row header-margin">
                        <div className="col-lg-12">
                            <div className="content-header">
                                <div className="header-section">
                                    <h1>Resource Utilization </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row res-stats">
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon label-green pull-left animation-fadeIn"><span
                                    className="res-counter">100</span></div>
                                <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                            </div>
                        </a></div>
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon pull-left label-red animation-fadeIn"><span className="res-counter">30</span>
                                </div>
                                <h3 className="widget-content text-right animation-pullDown"> Free Resources </h3>
                            </div>
                        </a></div>
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon pull-left label-lg-blue animation-fadeIn"><span
                                    className="res-counter">70</span></div>
                                <h3 className="widget-content text-right animation-pullDown"> Booked Resources
                                    <small className="side-text"><span className="text-light">Billed: 60</span> <span
                                        className="text-light">Unbilled: 10</span></small>
                                </h3>
                            </div>
                        </a></div>
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra label-lg-grey">
                                    <div className="widget-title">Booked Resources</div>
                                </div>
                                <div className="widget-extra-full">
                                    <div className="row text-center">
                                        <div className="col-xs-12 col-lg-4 cards"><span className="cards-counter">50%</span>
                                            <span className="cards-text"><i className="fa fa-cogs"></i>Services</span></div>
                                        <div className="col-xs-12 col-lg-4 cards"><span className="cards-counter">25%</span>
                                            <span className="cards-text"><i className="fa fa-cubes "></i>Products</span></div>
                                        <div className="col-xs-12 col-lg-4 cards"><span className="cards-counter">25%</span>
                                            <span className="cards-text"><i className="fa fa-building-o"></i>Internal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra label-lg-grey">
                                    <div className="widget-title">Available Resources</div>
                                </div>
                                <div className="widget-extra-full">
                                    <div className="row">
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Anjali
                                                        Shakya</h3>
                                                    <span className="cards-counts">50%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>
                                                </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Rusum
                                                        Shrestha</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>
                                                                      </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Mohammed
                                                        Naved Ansari</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Project Manager</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Kailash
                                                        Raj Bijayananda</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Solution Architect</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Anjali
                                                        Shakya</h3>
                                                    <span className="cards-counts">50%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Rusum
                                                        Shrestha</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Mohammed
                                                        Naved Ansari</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Project Manager</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Kailash
                                                        Raj Bijayananda</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Solution Architect</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Anjali
                                                        Shakya</h3>
                                                    <span className="cards-counts">50%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Rusum
                                                        Shrestha</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Sr. UI/UX Designer</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Mohammed
                                                        Naved Ansari</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Project Manager</span>

                                                </div>

                                            </div>
                                        </a></div>
                                        <div className="col-xs-12 col-lg-3"><a className="widget widget-hover-effect1">
                                            <div className="widget-simple widget-custom">
                                                <div className="cards">
                                                    <h3 className="widget-content text-center animation-pullDown">Kailash
                                                        Raj Bijayananda</h3>
                                                    <span className="cards-counts">20%</span>
                                                    <span className="cards-text">Solution Architect</span>

                                                </div>

                                            </div>
                                        </a></div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="block">
                                <div className="block-title-border clearfix"><span className="pull-left">Projects Ending </span>
                                </div>
                                <div className="list-wrapper">
                                    <ul className="list-group">
                                        <li className="list-group-item"><span>Projects</span> <span>Resources</span></li>
                                        <li className="list-group-item"><span>Vayoo</span> <span>5</span></li>
                                        <li className="list-group-item"><span>Scale IT</span> <span
                                            className="pull-right">5</span></li>
                                        <li className="list-group-item"><span>Gham Power</span> <span
                                            className="pull-right">2</span></li>
                                        <li className="list-group-item"><span>Total</span> <span>12</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="block">
                                <div className="block-title-border ">Block 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    module.exports = Dashboard

})();
