;(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom');

    var Dashboard = React.createClass({

        render: function () {
            return (
                <div id="page-content">
                    <div className="row">
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
                                    className="res-counter">30</span></div>
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
                                        <div className="col-xs-12 col-lg-4 cards">
                                            <span className="cards-counter">50%</span>
                                            <span className="cards-text">
                                                <i className="fa fa-cogs"></i>
                                                Services
                                            </span>
                                        </div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span> <span className="cards-text"><i
                                            className="fa fa-cubes "></i>Products</span></div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span> <span className="cards-text"><i
                                            className="fa fa-building-o"></i>Internal</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block full">
                                <div className="block-title">
                                    <h2>Available Resources</h2>
                                </div>
                                <div className="table-responsive">
                                    <table id="resource-free" className="table table-vcenter table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th>Resource Detail</th>
                                            <th>Core Skills</th>
                                            <th>Allocation</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="profile-holder clearfix"><span
                                                    className="profile-img pull-left img-lg"><img
                                                    src="dist/img/placeholders/avatar.png" alt="avatar"
                                                    className="img-circle"/></span> <span
                                                    className="profile-detail pull-left"> <span className="label-name">Anjali Shakya</span> <span>Sr. UI/UX Designer</span> </span>
                                                </div>
                                            </td>
                                            <td><span className="label label-indigo">HTML</span><span
                                                className="label label-indigo">CSS</span><span
                                                className="label label-indigo">Photoshop</span></td>
                                            <td>100%</td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="profile-holder clearfix"><span
                                                    className="profile-img pull-left img-lg"><img
                                                    src="dist/img/placeholders/avatar.png" alt="avatar"
                                                    className="img-circle"/></span> <span
                                                    className="profile-detail pull-left"> <span className="label-name">Anuj Joshi </span> <span>Software Engineer</span> </span>
                                                </div>
                                            </td>
                                            <td><span className="label label-red">ROR</span></td>
                                            <td>25%</td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="profile-holder clearfix"><span
                                                    className="profile-img pull-left img-lg"><img
                                                    src="dist/img/placeholders/avatar.png" alt="avatar"
                                                    className="img-circle"/></span> <span
                                                    className="profile-detail pull-left"> <span className="label-name">Bibhushan Raj Joshi </span> <span>Associate Software Engineer </span> </span>
                                                </div>
                                            </td>
                                            <td><span className="label label-deep-orange">JAVA</span></td>
                                            <td>50%</td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="profile-holder clearfix"><span
                                                    className="profile-img pull-left img-lg"><img
                                                    src="dist/img/placeholders/avatar.png" alt="avatar"
                                                    className="img-circle"/></span> <span
                                                    className="profile-detail pull-left"> <span className="label-name">Grishma Shrestha </span> <span>Associate Software Engineer </span> </span>
                                                </div>
                                            </td>
                                            <td><span className="label label-green">Android</span></td>
                                            <td>100%</td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="profile-holder clearfix"><span
                                                    className="profile-img pull-left img-lg"><img
                                                    src="dist/img/placeholders/avatar.png" alt="avatar"
                                                    className="img-circle"/></span> <span
                                                    className="profile-detail pull-left"> <span className="label-name">Grishma Shrestha </span> <span>Associate Software Engineer </span> </span>
                                                </div>
                                            </td>
                                            <td><span className="label label-green">Android</span></td>
                                            <td>100%</td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="block full">
                                <div className="block-title">
                                    <h2>Project Details</h2>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-vcenter table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th>Projects</th>
                                            <th>Type</th>
                                            <th>Resources</th>
                                            <th>End Date</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="danger">
                                            <td>Leapfrog Management System</td>
                                            <td>Product</td>
                                            <td><span className="label label-blue-grey">Developer <span
                                                className="counts">3</span></span><span
                                                className="label label-blue-grey">Quality Analyst<span
                                                className="counts">1</span></span> <span
                                                className="label label-blue-grey">Project Manager<span
                                                className="counts">1</span></span></td>
                                            <td>3/2/2016</td>
                                            <td className="text-center"><span
                                                className="label text-uppercase label-green ">In progress</span></td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr className="warning">
                                            <td>Vayoo</td>
                                            <td>Services</td>
                                            <td><span className="label label-blue-grey">Developer<span
                                                className="counts">5</span></span><span
                                                className="label label-blue-grey">Quality Analyst<span
                                                className="counts">1</span></span> <span
                                                className="label label-blue-grey">Project Manager<span
                                                className="counts">1</span></span></td>
                                            <td>11/2/2016</td>
                                            <td className="text-center"><span
                                                className="label text-uppercase label-green ">In progress</span></td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Scale IT</td>
                                            <td>Product</td>
                                            <td><span className="label label-blue-grey">Developer<span
                                                className="counts">3</span></span><span
                                                className="label label-blue-grey">Quality Analyst<span
                                                className="counts">1</span></span></td>
                                            <td>18/2/2016</td>
                                            <td className="text-center"><span
                                                className="label text-uppercase label-green ">In progress</span></td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Linkway</td>
                                            <td>Service</td>
                                            <td><span className="label label-blue-grey">Developer<span
                                                className="counts">2</span></span><span
                                                className="label label-blue-grey">Quality Analyst<span
                                                className="counts">2</span></span><span
                                                className="label label-blue-grey">Designer<span
                                                className="counts">1</span></span></td>
                                            <td>29/2/2016</td>
                                            <td className="text-center"><span
                                                className="label text-uppercase label-green ">In progress</span></td>
                                            <td className="text-center">
                                                <div className="btn-group"><a href="javascript:void(0)"
                                                                              data-toggle="tooltip" title="Edit"
                                                                              className="btn btn-xs btn-default"><i
                                                    className="fa fa-pencil"></i></a></div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="block">
                                <div className="block-title-border ">Projects Ending</div>
                                <div className="list-wrapper">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <span>Projects</span>
                                            <span>Resources</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>Vayoo</span>
                                            <span>5</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>Scale IT</span>
                                            <span className="pull-right">5</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>Gham Power</span>
                                            <span className="pull-right">2</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>Total</span>
                                            <span>12</span>
                                        </li>

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
            )
        }
    });

    module.exports = Dashboard
    
})();
