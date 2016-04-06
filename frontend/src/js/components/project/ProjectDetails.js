/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/25/16.
 */

;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;
    var Link = require('react-router').Link;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');

    var SwimLaneChart = require('../../util/charts/SwimLaneChart');
    var TeamMemberView = require('./member/TeamMemberView');
    var Contract = require('./contract/ContractView');
    var HistoryItem = require('./HistoryItem');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //libraries
    var _ = require('lodash');

    var ProjectDetails = React.createClass({
        getInitialState: function () {
            return {
                containsMoreHistories: false,
                selectedTeamMember: {},
                project: {
                    id: null,
                    title: null,
                    description: null,
                    projectType: {},
                    projectStatus: {},
                    accountManager: {},
                    client: {},
                    technologyStack: [],
                    contracts: [{
                        id: null,
                        budgetType: {},
                        startDate: null,
                        endDate: null,
                        actualEndDate: null,
                        contractedResource: null,
                        teamMembers: [
                            {
                                id: null, name: null, status: null, billed: null,
                                allocation: [
                                    {
                                        startDate: null,
                                        endDate: null,
                                        role: {}
                                    }
                                ]
                            }
                        ]
                    }]
                },
                history: [
                    {
                        id: 1,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 2,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 3,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 4,
                        type: 'contract',
                        projectId: '1',
                        changes: {
                            budgetType: {id: 2, title: 'fixed'},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 5,
                        type: 'contract',
                        projectId: '1',
                        changes: {
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 6,
                        type: 'contractMember',
                        projectId: '1',
                        changes: {
                            allocation: 100,
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 7,
                        type: 'contractMember',
                        projectId: '1',
                        add: {
                            allocation: 100,
                            endDate: '1212-34-43',
                            startDate: '2323-34-44'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 8,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 9,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 10,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 11,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }
                ]
            }
        },

        componentDidMount: function () {
            this.setState({project: this.getFakeProjectDetails()});
            console.log(this.state.project);
            if (this.state.history.length > 10) {
                this.state.history.splice(10, this.state.history.length);
                this.setState({containsMoreHistories: true});
            }
            //this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
        },

        getFakeProjectDetails: function () {
            var project = {
                id: '3',
                title: 'Leapfrog MS',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy textr since the 1500s, when an unknown printer took a galley of type and scrambled',
                projectType: {id: '1', title: 'client'},
                projectStatus: {id: '1', title: 'budget', color: '#6CC068'},
                accountManager: {id: '1', firstName: 'Bishal', middleName: 'Man', lastName: 'Shrestha'},
                client: {id: '1', name: 'Richan Shrestha', email: 'r_s@gmail.com'},
                technologyStack: [{id: '1', title: 'java'}, {id: '2', title: 'react'}, {id: '3', title: 'maven'}],
                contracts: [
                    {
                        id: '1',
                        budgetType: {id: '1', title: 'paid'},
                        startDate: '2045-02-03',
                        endDate: '2080-04-06',
                        actualEndDate: '2077-04-06',
                        contractedResource: 'I need one java developer one react developer',
                        teamMembers: [
                            {
                                id: '1', name: 'bishal', status: 'active', billed: true,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            },
                            {
                                id: '2', name: 'pratish', status: 'active', billed: true,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '2',
                        budgetType: {id: '1', title: 'paid'},
                        startDate: '2052-02-03',
                        endDate: '2077-04-06',
                        actualEndDate: '2077-04-06',
                        contractedResource: 'I need one java developer one react developer',
                        teamMembers: [
                            {
                                id: '2', name: 'bishal', status: 'active', billed: true,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            },
                            {
                                id: '1', name: 'pratish', status: 'inactive', billed: false,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '3',
                        budgetType: {id: '2', title: 'internal'},
                        startDate: '2012-02-03',
                        endDate: '2090-04-06',
                        actualEndDate: '2077-04-06',
                        contractedResource: 'I need one java developer one react developer',
                        teamMembers: [
                            {
                                id: '1', name: 'bishal', status: 'active', billed: true,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            },
                            {
                                id: '2', name: 'pratish', status: 'active', billed: true,
                                allocation: [
                                    {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }, {
                                        startDate: '2045-02-03',
                                        endDate: '2080-04-06',
                                        role: {id: '1', title: 'Developer'}
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
            return project;
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECTS);
            this.props.actions.apiClearState();
        }
        ,

        unwantedFunction: function () {
            /*<div className="row">
             <div className="col-lg-12">
             <div className="block full">
             <div className="block-title">
             <h2>Project Details</h2>
             </div>
             <div className="table-responsive">
             <table className="table table-vcenter table-hover table-striped">
             <tbody>
             <tr>
             <th>Project Name</th>
             <td>{this.props.selectedItem.projects.title}</td>
             </tr>
             <tr>
             <th>Description</th>
             <td>{this.props.selectedItem.projects && this.props.selectedItem.projects.description}</td>
             </tr>
             <tr>
             <th>Start Date</th>
             <td>{this.props.selectedItem.projects.startDate}</td>
             </tr>
             <tr>
             <th>End Date</th>
             <td>{this.props.selectedItem.projects.endDate}</td>
             </tr>
             <tr>
             <th>Budget Type</th>
             <td>{this.props.selectedItem.projects.budgetType && this.props.selectedItem.projects.budgetType.title}</td>
             </tr>
             <tr>
             <th>Project Type</th>
             <td>{this.props.selectedItem.projects.projectType && this.props.selectedItem.projects.projectType.title}</td>
             </tr>
             <tr>
             <th>Project Status</th>
             <td>{this.props.selectedItem.projects.projectStatus && this.props.selectedItem.projects.projectStatus.title}</td>
             </tr>
             <tr>
             <th>Account Manager</th>
             <td></td>
             </tr>
             </tbody>
             </table>

             </div>
             <SwimLaneChart width="960"/>
             </div>
             </div>
             </div>*/
        }
        ,

        getAccountManagerName: function () {
            var accountManager = this.state.project.accountManager;
            var name = '';
            if (accountManager.id) {
                name = accountManager.firstName;
                if (accountManager.middleName) {
                    name = name.concat(' ', accountManager.middleName);
                }
                name = name.concat(' ', accountManager.lastName);
            }
            return name;
        }
        ,

        listTechnologyStack: function (technologyStack) {
            return (
                <span className="label label-blue-grey" key={technologyStack.id}>
                        {technologyStack.title}
                </span>
            );
        },

        setMemberToBeInModal: function (teamMember) {
            this.setState({selectedTeamMember: teamMember});
        },

        renderContract: function (contract) {
            return (
                <Contract contract={contract} key={contract.id} setMemberToBeInModal={this.setMemberToBeInModal}/>
            );
        },

        renderHistoryItems: function (history) {

            console.log('jlsdf')
            return (
                <HistoryItem history={history} key={history.id}/>
            )
        },

        render: function () {
            var style = {
                background: this.state.project.projectStatus.color
            };
            var contractIds = Object.assign(this.state.project.contracts);

            return (
                <div>
                    <EntityHeader header="Project Details" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block clearfix">
                                <div className="block-title-border">{this.state.project.title}
                                    <div className="block-options">
                                        <div className="label-block pull-left"><span
                                            className="label text-uppercase" style={style}
                                            name="Project Status">{this.state.project.projectStatus.title}</span> <span
                                            className="label label-lg-grey text-uppercase">{this.state.project.projectType.title}</span>
                                        </div>
                                        <Link to={urlConstant.PROJECTS.EDIT + this.state.project.id}
                                              data-toggle="tooltip"
                                              title="Edit"
                                              className="btn btn-sm btn-default"><i
                                            className="fa fa-pencil"></i></Link></div>
                                </div>
                                <div className="block-wrapper">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="common-view"><span
                                                className="view-label"> Project Description</span>
                                                <p>{this.state.project.description}</p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Client's Name</span>
                                                <p>{this.state.project.client.name}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Client's E-mail Address</span>
                                                <p>{this.state.project.client.email}</p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label">Account Manager</span>
                                                <p>{this.getAccountManagerName()}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Technology Stack</span>
                                                <p>
                                                    {this.state.project.technologyStack.map(this.listTechnologyStack)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="panel-group custom-accordion" id="accordion" role="tablist"
                                             aria-multiselectable="true">
                                            {this.state.project.contracts.map(this.renderContract)}
                                        </div>
                                        <div className="block full">
                                            <div className="block-title">
                                                <h2>History</h2>
                                            </div>
                                            <div className="timeline block-content-full">
                                                <ul className="timeline-list timeline-hover">
                                                    {this.state.history.map(this.renderHistoryItems)}
                                                </ul>

                                            </div>
                                            <div className="block-title show-all-wrp">
                                                {this.state.containsMoreHistories &&
                                                <Link to={urlConstant.PROJECTS.HISTORY +'/' + this.state.project.id} title="Add Project"
                                                      className="show-all-btn">View All</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TeamMemberView selectedTeamMember={this.state.selectedTeamMember}/>

                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            selectedItem: state.crudReducer.selectedItem
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

})();