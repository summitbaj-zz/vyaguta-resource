;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //components
    var FreeResources = require('./FreeResources');

    var Dashboard = React.createClass({
        getInitialState: function () {
            return {
                freeResources: [
                    {
                        id: 1,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 2,
                        name: 'An Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 3,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 4,
                        name: 'An Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 5,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 6,
                        name: 'An Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 7,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 8,
                        name: 'An Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 9,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 10,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 11,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 12,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 13,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 14,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 15,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 16,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 17,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 18,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 19,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 20,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 21,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 22,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 23,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 24,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 25,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 26,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 27,
                        name: 'Anjali Shakya',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    }
                ]
            }
        },

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
                                <div className="widget-icon pull-left label-red animation-fadeIn"><span
                                    className="res-counter">30</span>
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
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">50%</span>
                                            <span className="cards-text"><i className="fa fa-cogs"></i>Services</span>
                                        </div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span>
                                            <span className="cards-text"><i className="fa fa-cubes "></i>Products</span>
                                        </div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span>
                                            <span className="cards-text"><i
                                                className="fa fa-building-o"></i>Internal</span>
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
                                        <FreeResources resources={this.state.freeResources}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="block">
                                <div className="block-title-border clearfix"><span
                                    className="pull-left">Projects Ending </span>
                                </div>
                                <div className="list-wrapper">
                                    <ul className="list-group">
                                        <li className="list-group-item"><span>Projects</span> <span>Resources</span>
                                        </li>
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

})
();
