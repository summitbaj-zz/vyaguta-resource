;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //components
    var Resources = require('./Resources');
    var FreeResources = require('./FreeResources');
    var BookedResources = require('./BookedResources');
    var EndingProjects = require('./EndingProjects');
    var InProgressProjects = require('./InProgressProjects');
    var EntityHeader = require('../common/header/EntityHeader');

    //actions
    var dashboardActions = require('../../actions/dashboardActions');
    var apiActions = require('../../actions/apiActions');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');

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

        componentDidMount: function () {
            this.props.actions.fetchByField(resourceConstant.PROJECTS, resourceConstant.PROJECT_STATUS, 'In Progress');

            var request = 'btn' + this.addDayInDate(0) + 'and' + this.addDayInDate(15);
            this.props.actions.fetchByEndDate(resourceConstant.dashboard, request);
            this.props.actions.fetchResourceCount(resourceConstant.resourceUtilization);
        },

        addDayInDate: function (value) {
            var today = new Date();
            var newDate = new Date();
            newDate.setDate(today.getDate() + value);
            return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
        },

        render: function () {
            console.log();
            return (
                <div id="page-content" className="page-content">
                    <EntityHeader header="Resource Utilization"/>
                    <Resources resources={this.props.resourceUtilization}/>
                    <BookedResources />
                    <InProgressProjects projects={this.props.projects}/>
                    <FreeResources resources={this.state.freeResources}/>
                    <EndingProjects endingProjects={this.props.endingProjects}/>
                </div>
            );
        }
    });
    var mapStateToProps = function (state) {
        return {
            projects: state.dashboardReducer.inProgressProjects,
            endingProjects: state.dashboardReducer.endingProjects,
            resourceUtilization: state.dashboardReducer.resourceUtilization
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, dashboardActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

})
();
