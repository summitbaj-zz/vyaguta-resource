;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //components
    var Resource = require('./resource/Resource');
    var FreeResource = require('./free-resource/FreeResource');
    var BookedResource = require('./booked-resource/BookedResource');
    var EndingProjects = require('./ending-projects/EndingProjects');
    var OverdueProjects = require('./overdue-projects/OverdueProjects');
    var InProgressProjects = require('./ongoing-projects/InProgressProjects');
    var EntityHeader = require('../common/header/EntityHeader');

    //actions
    var dashboardActions = require('../../actions/dashboardActions');
    var apiActions = require('../../actions/apiActions');

    //constants
    var resourceConstants = require('../../constants/resourceConstants');

    //utils
    var converter = require('../../utils/converter');

    //libraries
    var _ = require('lodash');

    var Dashboard = React.createClass({
        componentWillMount: function () {
            this.props.actions.fetch(resourceConstants.ONGOING_PROJECTS, resourceConstants.PROJECTS, {projectStatus: resourceConstants.IN_PROGRESS});
            //this.props.actions.fetch(resourceConstants.ENDING_PROJECTS, converter.getPathParam(resourceConstants.PROJECTS, resourceConstants.ENDING), {days: 15});
            this.props.actions.fetch(resourceConstants.OVERDUE_PROJECTS, converter.getPathParam(resourceConstants.PROJECTS, resourceConstants.OVERDUE));
            this.props.actions.fetchResourceCount(resourceConstants.UTILIZATION, converter.getPathParam(resourceConstants.PROJECTS, resourceConstants.RESOURCE, resourceConstants.UTILIZATION));
            this.props.actions.fetchResourceCount(resourceConstants.AVAILABLE, converter.getPathParam(resourceConstants.PROJECTS, resourceConstants.RESOURCE, resourceConstants.AVAILABLE));
            this.props.actions.fetchResourceCount(resourceConstants.BOOKED, converter.getPathParam(resourceConstants.PROJECTS, resourceConstants.RESOURCE, resourceConstants.BOOKED));
        },

        componentWillUnmount: function () {
            this.props.actions.apiClearState();
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
            endingProjects: state.dashboardReducer.endingProjects,
            overdueProjects: state.dashboardReducer.overdueProjects,
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

})();
