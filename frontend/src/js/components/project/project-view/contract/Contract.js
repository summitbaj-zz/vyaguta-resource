;(function () {
    /*'use strict';*/

    //React dependencies
    var React = require('react');

    //components
    var TeamMember = require('./contract-member/ContractMember');
    var Contract = React.createClass({

        componentDidMount: function () {
            if (this.props.length - 1 == this.props.index) {
                var contractAccordion = this.refs['collapseContract' + this.props.index];
                contractAccordion.click();
            }
        },

        renderTeamMember: function (teamMember) {
            return (
                <TeamMember key={teamMember.employee.id} contractMember={teamMember}
                            setMemberToBeInModal={this.props.setMemberToBeInModal}/>
            );
        },

        render: function () {
            var contract = this.props.contract;
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={'heading' + this.props.index}>
                        <h4 className="panel-title">
                            <a role="button"
                               data-toggle="collapse"
                               data-parent="#accordion"
                               href={'#collapse' + this.props.index}
                               ref={"collapseContract" + this.props.index}
                               aria-expanded="true"
                               aria-controls={'collapse' + this.props.index}
                            >
                                Contract{(contract.startDate && contract.endDate) &&
                            <span> From <strong>{contract.startDate}</strong> to <strong>{contract.endDate}</strong></span>}
                            </a>
                        </h4>
                    </div>
                    <div id={'collapse' + this.props.index} className="panel-collapse collapse"
                         role="tabpanel"
                         aria-labelledby={'heading' + this.props.index}>
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
    module.exports = Contract;
})();