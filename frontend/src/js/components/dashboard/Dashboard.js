;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;
    var Link = require('react-router').Link;

    //components
    var FreeResources = require('./FreeResources');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var Dashboard = React.createClass({
        getInitialState: function () {
            return {
                freeResources: [
                    {
                        id: 1,
                        name: 'Kailash Raj Bijayanada',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 2,
                        name: 'Mohammed Naved Ansari',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 3,
                        name: 'Pritush Bahadur Shrestha',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 4,
                        name: 'Anish Krishna Manandhar',
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
                        name: 'Bishal Shrestha',
                        allocation: '50%',
                        post: 'S. UI/UX Designer'
                    },
                    {
                        id: 7,
                        name: 'Ram',
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
                ],
                endingProjects: []
            }
        },

        addDayInDate: function (value) {
            var today = new Date();
            var newDate = new Date();
            newDate.setDate(today.getDate() + value);
            return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);

        },

        componentDidMount: function () {
            this.props.actions.fetchByField(resourceConstant.PROJECTS, 'projectStatus', 'In Progress');

            var request = 'btn' + this.addDayInDate(0) + 'and' + this.addDayInDate(15);
            this.props.actions.fetchByEndDate(resourceConstant.PROJECTS, 'contract.endDate', request);
        },

        componentWillReceiveProps: function (nextProps) {
            if (nextProps.endingProjects) {
                this.getEndingProjectsData(nextProps.endingProjects);
            }
        },

        isEnding: function (date) {
            var date1 = new Date();
            var date2 = new Date(date);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays <= 15 && diffDays >= 0) {
                return true;
            }
        },

        getEndingProjectsData: function (endingProjects) {
            var that = this;
            var endingProjectsArray = [];

            for (var i = 0; i < endingProjects.length; i++) {
                for (var j = 0; j < endingProjects[i].contracts.length; j++) {
                    var endingContract = endingProjects[i].contracts[j];
                    if (that.isEnding(endingContract.endDate)) {
                        var endingProjectObject = {};
                        endingProjectObject['endDate'] = endingContract.endDate;
                        endingProjectObject['project'] = endingProjects[i].title;
                        endingProjectObject['resources'] = endingContract.contractMembers.length;
                        endingProjectsArray.push(endingProjectObject);
                    }
                }
            }
            this.setState({endingProjects: endingProjectsArray});
        },

        renderEndingProject: function (key) {
            var endingProject = this.state.endingProjects[key];
            return (
                <li className="list-group-item" key={key}><span
                    className="list-group-project">{endingProject.project}</span>
                    <span>{endingProject.endDate}</span><span>{endingProject.resources}</span></li>
            );
        },

        renderProject: function (key) {
            var project = this.props.projects[key];
            var style = {
                background: project.projectStatus && project.projectStatus.color
            };
            return (<tr key={key}>
                <td>{++key}</td>
                <td><Link to={urlConstant.PROJECTS.DETAILS+'/'+project.id}>{project.title}</Link></td>
                <td>{project.projectType && project.projectType.title}</td>
                <td><span className="label text-uppercase"
                          style={style}>{project.projectStatus && project.projectStatus.title}</span></td>
                <td className="text-center">
                    <div className="btn-group"><Link to={urlConstant.PROJECTS.EDIT + project.id}
                                                     data-toggle="tooltip"
                                                     title="Edit"
                                                     className="btn btn-sm btn-default"><i
                        className="fa fa-pencil"></i></Link>
                        <Link to={urlConstant.PROJECTS.DETAILS +'/' + project.id} data-toggle="tooltip"
                              title="View Details"
                              className="btn btn-sm btn-default"><i
                            className="glyphicon glyphicon-list-alt"></i></Link>
                    </div>
                </td>
            </tr>);
        },

        getEndingProjectsResourceTotal: function () {
            var resources = 0;
            for (var i = 0; i < this.state.endingProjects.length; i++) {
                resources += parseInt(this.state.endingProjects[i].resources);
            }
            return resources;
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
                                    <small className="side-text"><span
                                        className="text-light">Billed: 60 (86%)</span> <span
                                        className="text-light">Unbilled: 10 (14%)</span></small>
                                </h3>
                            </div>
                        </a></div>
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra widget-custom">
                                    <div className="widget-title">Booked Resources</div>
                                </div>
                                <div className="widget-extra-full">
                                    <div className="row text-center">
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">50%</span>
                                            <span className="cards-text"><i className="fa fa-cogs"></i><span
                                                className="display-inline">Services</span></span>
                                            <small className="side-text"><span
                                                className="text-light">Billed: 50 (50%)</span> <span
                                                className="text-light">Unbilled: 50 (50%)</span></small>
                                        </div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span>
                                            <span className="cards-text"><i className="fa fa-cubes "></i><span
                                                className="display-inline">Products</span></span>
                                            <small className="side-text"><span
                                                className="text-light">Billed: 25 (50%)</span> <span
                                                className="text-light">Unbilled: 25 (50%)</span></small>
                                        </div>
                                        <div className="col-xs-12 col-lg-4 cards"><span
                                            className="cards-counter">25%</span>
                                            <span className="cards-text"><i
                                                className="fa fa-building-o"></i><span className="display-inline">Internal</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block clearfix">
                        <div className="block-title"><h2>ProjectDetails</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECTS.INDEX} title="List Project"
                                      className="btn btn-sm btn-ghost btn-success text-uppercase"> View All</Link>
                            </div>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th className="col-250">Projects</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projects).map(this.renderProject)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra widget-custom">
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
                                        <li className="list-group-item"><span
                                            className="list-group-project">Projects</span>
                                            <span>End Date</span><span>Resources</span>
                                        </li>
                                        {Object.keys(this.state.endingProjects).map(this.renderEndingProject)}
                                        <li className="list-group-item">
                                            <span>Total</span><span>{this.getEndingProjectsResourceTotal()}</span></li>
                                    </ul>
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
            projects: state.crudReducer.projects,
            endingProjects: state.crudReducer.endingProjects
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

})
();
