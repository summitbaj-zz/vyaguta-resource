/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');

    //components
    var ContractMemberForm = require('./ContractMemberForm');

    //utils
    var employeeUtil = require('../../../../../utils/employeeUtil');

    //services
    var contractMemberService = require('../../../../../services/contractMemberService');

    var ContractMember = React.createClass({
        showModal: function (event) {
            event.preventDefault();
            this.props.setMemberIndex(this.props.index);
            this.props.actions.selectContractMember(this.props.contractMember);
            this.props.toggleModalState();
        },

        render: function () {
            return (
                <li>
                    <a href="#" onClick={this.showModal}>
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
