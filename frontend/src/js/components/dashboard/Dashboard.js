;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;
    var Link = require('react-router').Link;

    //components
    var FreeResources = require('./FreeResources');
    var EntityHeader = require('../common/header/EntityHeader');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //utils
    var convertContractHash = require('../../util/convertContractHash');

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
            console.log(request);
            this.props.actions.fetchByEndDate('dashboard', request);
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
            var id = 0;

            for (var i = 0; i < endingProjects.length; i++) {
                var endingContracts = convertContractHash.toFrontEndHash(endingProjects[i].contracts);
                for (var j = 0; j < endingContracts.length; j++) {
                    if (that.isEnding(endingContracts[j].endDate)) {
                        var endingProjectObject = {};
                        endingProjectObject['id'] = id;
                        endingProjectObject['endDate'] = endingContracts[j].endDate;
                        endingProjectObject['project'] = endingProjects[i].title;
                        endingProjectObject['resources'] = endingContracts[j].contractMembers.length;
                        id++;
                        endingProjectsArray.push(endingProjectObject);
                    }
                }
            }
            return endingProjectsArray;
        },

        renderEndingProject: function (endingProject) {
            return (
                <li className="list-group-item" key={endingProject.id}><span
                    className="list-group-project">{endingProject.project}</span>
                    <span>{endingProject.endDate}</span><span>{endingProject.resources}</span></li>
            );
        },

        renderProject: function (key) {
            var project = this.props.projects[key];
            var id = project.id;
            var style = {
                background: project.projectStatus && project.projectStatus.color
            };
            return (<tr key={key}>
                <td>{++key}</td>
                <td><Link to={urlConstant.PROJECTS.INDEX + '/' + id +  urlConstant.PROJECTS.VIEW}>{project.title}</Link>
                </td>
                <td>{project.projectType && project.projectType.title}</td>
                <td><span className="label text-uppercase"
                          style={style}>{project.projectStatus && project.projectStatus.title}</span></td>
                <td className="text-center">
                    <div className="btn-group"><Link to={urlConstant.PROJECTS.INDEX + '/' + id}
                                                     data-toggle="tooltip"
                                                     title="Edit"
                                                     className="btn btn-sm btn-default"><i
                        className="fa fa-pencil"></i></Link>
                        <Link to={urlConstant.PROJECTS.INDEX + '/' + id +  urlConstant.PROJECTS.VIEW}
                              data-toggle="tooltip"
                              title="View Details"
                              className="btn btn-sm btn-default"><i
                            className="glyphicon glyphicon-list-alt"></i></Link>
                    </div>
                </td>
            </tr>);
        },

        getEndingProjectsResourceTotal: function (endingProjects) {
            var resources = 0;
            for (var i = 0; i < endingProjects.length; i++) {
                resources += parseInt(endingProjects[i].resources);
            }
            return resources;
        },

        render: function () {
            var endingProjects;
            if (this.props.endingProjects.length > 0) {
                endingProjects = this.getEndingProjectsData(this.props.endingProjects);
            }

            return (
                <div id="page-content" className="page-content">
                    <EntityHeader header="Resource Utilization"/>
                    <div className="row res-stats">
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                    className="res-counter">100</span></div>
                                <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                            </div>
                        </a></div>
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon animation-fadeIn pull-left label-red"><span
                                    className="res-counter">30</span>
                                </div>
                                <h3 className="widget-content text-right animation-pullDown"> Free Resources </h3>
                            </div>
                        </a></div>
                        <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                            <div className="widget-simple">
                                <div className="widget-icon animation-fadeIn pull-left label-lg-blue"><span
                                    className="res-counter">70</span></div>
                                <h3 className="widget-content text-right animation-pullDown"> Booked Resources
                                    <small className="side-text"><span
                                        className="text-light">Billed: 60 (86%)</span> <span
                                        className="text-light">Unbilled: 10 (14%)</span></small>
                                </h3>
                            </div>
                        </a></div>
                    </div>
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
                    <div className="block clearfix">
                        <div className="block-title"><h2>Project Details</h2>
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
                                        {endingProjects && endingProjects.map(this.renderEndingProject)}
                                        <li className="list-group-item">
                                            <span>Total</span><span>{endingProjects && this.getEndingProjectsResourceTotal(endingProjects) || 0}</span>
                                        </li>
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
