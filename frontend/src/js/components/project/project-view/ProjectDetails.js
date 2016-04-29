;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;
    var Link = require('react-router').Link;

    //constants
    var resourceConstant = require('../../../constants/resourceConstants');
    var urlConstant = require('../../../constants/urlConstants');

    //components
    var EntityHeader = require('../../common/header/EntityHeader');

    var TimelineChart = require('./TimelineChart');
    var TeamMemberView = require('./contract/contract-member/ContractMemberView');
    var Contract = require('./contract/Contract');
    var HistoryItem = require('./HistoryItem');

    //actions
    var crudActions = require('../../../actions/crudActions');
    var apiActions = require('../../../actions/apiActions');
    var historyActions = require('../../../actions/historyActions');
    var contractActions = require('../../../actions/contractActions');

    //libraries
    var _ = require('lodash');

    //util
    var historyUtil = require('../../../util/historyUtil');

    var ProjectDetails = React.createClass({
        getInitialState: function () {
            return {
                containsMoreHistories: false,
                selectedTeamMember: {}
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchAllHistories(resourceConstant.PROJECTS, this.props.params.id);
            this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECTS);
            this.props.actions.apiClearState();
            this.props.actions.clearHistory();
            this.props.actions.clearContracts();
        },

        getAccountManagerName: function () {
            var accountManager = this.props.selectedItem.projects.accountManager || {};
            var name = '-';
            if (accountManager.id) {
                name = accountManager.firstName;
                if (accountManager.middleName && accountManager.middleName != 'NULL') {
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

        renderContract: function (key) {
            var contracts = this.props.contracts;
            return (
                <Contract key={key} index={key} length={contracts.length} contract={contracts[key]}
                          setMemberToBeInModal={this.setMemberToBeInModal}/>
            );
        },

        renderHistoryItems: function (history) {
            return (
                <HistoryItem history={history} key={history.id}/>
            )
        },

        render: function () {
            var project = this.props.selectedItem.projects || {};
            var style = {
                background: project.projectStatus && project.projectStatus.color
            };

            var convertedHistory = historyUtil.convertHistoryJSON(this.props.histories);
            var history = convertedHistory.length ? convertedHistory.reverse().slice(0, 5) : [];
            var containsMoreHistories = (convertedHistory.length > 5) ? true : false;

            return (
                <div>
                    <EntityHeader header="Project Details" routes={this.props.routes}
                                  title={project ? project.title : 'Project'}
                                  apiState={this.props.apiState}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block clearfix">
                                <div className="block-title-border">{project.title}
                                    <div className="block-options">
                                        <div className="label-block pull-left">
                                            {project.projectStatus && <span
                                                className="label text-uppercase" style={style}
                                                name="Project Status" title="Project Status">
                                                {project.projectStatus.title}
                                                </span>
                                            }
                                            {project.projectType &&
                                            <span
                                                className="label label-lg-grey text-uppercase">
                                                {project.projectType.title}
                                            </span>
                                            }
                                        </div>
                                        <Link to={urlConstant.PROJECTS.INDEX + '/' + this.props.params.id}
                                              data-toggle="tooltip"
                                              title="Edit"
                                              className="btn btn-sm btn-default">
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="block-wrapper">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="common-view"><span
                                                className="view-label"> Project Description</span>
                                                <p>{project.description || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="common-view  clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Client's Name</span>
                                                <p>{project.client && project.client.name || '-'}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Client's E-mail Address</span>
                                                <p>{project.client && project.client.email || '-'}</p>
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
                                                    {project.tags && project.tags.map(this.listTechnologyStack) || '-'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="panel-group custom-accordion" id="accordion" role="tablist"
                                                 aria-multiselectable="true">
                                                {Object.keys(this.props.contracts).map(this.renderContract)}
                                            </div>
                                        </div>

                                        <TimelineChart data={this.props.contracts}/>

                                        <div className="col-sm-12">
                                            <div className="block full">
                                                <div className="block-title">
                                                    <h2>History</h2>
                                                </div>
                                                <div className="timeline block-content-full">
                                                    <ul className="timeline-list timeline-hover">
                                                        {history.map(this.renderHistoryItems)}
                                                    </ul>

                                                </div>
                                                {containsMoreHistories &&
                                                <div className="block-title show-all-wrp">
                                                    <Link
                                                        to={urlConstant.PROJECTS.INDEX + '/' + this.props.params.id + urlConstant.PROJECTS.HISTORY}
                                                        title="Add Project"
                                                        className="show-all-btn">View All</Link>
                                                </div>}
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
            selectedItem: state.crudReducer.selectedItem,
            contracts: state.contractReducer.contractsForView,
            histories: state.historyReducer.project,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions, historyActions, contractActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

})();