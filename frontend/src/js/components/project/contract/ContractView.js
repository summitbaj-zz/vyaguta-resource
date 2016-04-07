;(function () {
    /*'use strict';*/

    //React dependencies
    var React = require('react');

    //components
    var TeamMember = require('./TeamMember');
    var ContractView = React.createClass({

        renderTeamMember: function (teamMember) {
            console.log(teamMember)
            return (
                <TeamMember key={teamMember.employee.id} contractMember={teamMember}
                            setMemberToBeInModal={this.props.setMemberToBeInModal}/>
            );
        },

        render: function () {
            var contract = this.props.contract;

            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={'heading' + contract.id}>
                        <h4 className="panel-title">
                            <a role="button"
                               data-toggle="collapse"
                               data-parent="#accordion"
                               href={'#collapse' + contract.id}
                               aria-expanded="true"
                               aria-controls={'collapse' + contract.id}
                            >
                                Contract{(contract.startDate && contract.endDate) && ' From ' + contract.startDate + ' to ' + contract.endDate}
                            </a>
                        </h4>
                    </div>
                    <div id={'collapse' + contract.id} className="panel-collapse collapse"
                         role="tabpanel"
                         aria-labelledby={'heading' + contract.id}>
                        <div className="panel-body">
                            <div className="block-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="common-view">
                                            <span className="view-label"> Contracted Resource</span>
                                            <p>{contract.resource}</p>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Start Date </span>
                                                <p>{contract.startDate || '-'}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> End Date </span>
                                                <p>{contract.endDate || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Actual End Date </span>
                                                <p>{contract.actualEndDate || '-'}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Budget Type </span>
                                                <p>{contract.budgetType && contract.budgetType.title || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Team Members</label>
                                <div className="row  text-center">
                                    <div className="col-sm-12">
                                        <div className="user-list-widget">
                                            <ul className="user-list list-medium">
                                                {contract.contractMembers.map(this.renderTeamMember)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    module.exports = ContractView;
})();