;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //utils
    var employeeUtil = require('../../../../../utils/employeeUtil');

    //services
    var contractMemberService = require('../../../../../services/contractMemberService');

    var ContractMember = React.createClass({
        render: function () {
            return (
                <li>
                    <a href="#" className="view-team" data-toggle="modal" data-target="#viewTeam"
                       onClick={this.props.setMemberToBeInModal.bind(null, this.props.contractMember)}>
                        <img alt="avatar"
                             src="img/placeholders/avatar-2.jpg"/>
                        <div className={(contractMemberService.isActive(this.props.contractMember.allocations)) ? 'user-info user-active' : 'user-info user-inactive'}>
                            <span>
                                {employeeUtil.getEmployeeName(this.props.contractMember.employee)}
                            </span>
                            <span>
                            {contractMemberService.isBilled(this.props.contractMember.allocations)}
                            </span>
                            <span className="status">
                                {(contractMemberService.isActive(this.props.contractMember.allocations)) ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </a>
                </li>
            );
        }
    });

    module.exports = ContractMember;

})();