;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //components
    var Resource = require('./Resource');
    var FreeResource = require('./FreeResource');
    var BookedResource = require('./BookedResource');
    var EndingProjects = require('./EndingProjects');
    var OverdueProjects = require('./OverdueProjects');
    var InProgressProjects = require('./InProgressProjects');
    var EntityHeader = require('../common/header/EntityHeader');

    //actions
    var dashboardActions = require('../../actions/dashboardActions');
    var apiActions = require('../../actions/apiActions');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');

    var Dashboard = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchByField(resourceConstant.PROJECTS, resourceConstant.PROJECT_STATUS, 'In Progress');

            var request = 'btn' + this.addDayInDate(0) + 'and' + this.addDayInDate(15);
            this.props.actions.fetchByEndDate(resourceConstant.dashboard, 'projectEnding', request);
            this.props.actions.fetchOverdueProjects(resourceConstant.PROJECTS, resourceConstant.overdue);
            this.props.actions.fetchResourceCount(resourceConstant.resource, resourceConstant.utilization);
            this.props.actions.fetchResourceCount(resourceConstant.resource, resourceConstant.booked);
            this.props.actions.fetchResourceCount(resourceConstant.resource, resourceConstant.available);
        },

        componentWillUnmount: function () {
            this.props.actions.apiClearState();
        },

        addDayInDate: function (value) {
            var today = new Date();
            var newDate = new Date();
            newDate.setDate(today.getDate() + value);
            return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
        },

        render: function () {

            return (
                <div id="page-content" className="page-content">
                    <EntityHeader header="Resource Utilization" apiState={this.props.apiState}/>
                    <Resource resource={this.props.resource.utilization}/>
                    <BookedResource resource={this.props.resource.booked}/>
                    <InProgressProjects projects={this.props.projects}/>
                    <FreeResource resource={this.props.resource.available}/>
                    <div className="row">
                        <EndingProjects endingProjects={this.props.endingProjects}/>
                        <OverdueProjects overdueProjects={this.props.overdueProjects}/>
                    </div>
                </div>
            );
        }
    });
    var mapStateToProps = function (state) {
        return {
            projects: state.dashboardReducer.inProgressProjects,
            endingProjects: state.dashboardReducer.projectEnding,
            overdueProjects: state.dashboardReducer.overdeu,
            resource: state.dashboardReducer.resource,
            apiState: state.apiReducer
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
