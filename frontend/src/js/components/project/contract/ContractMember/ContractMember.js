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

    var ContractMember = React.createClass({
        showModal: function (event) {
            event.preventDefault();
            this.props.setMemberIndex(this.props.index);
            this.props.actions.selectContractMember(this.props.contractMember);
            this.props.toggleModalState();
        },

        isBilled: function () {
            var allocations = this.props.contractMember.allocations;

            if (allocations[allocations.length - 1].billed) {
                return true;
            }

            return false;
        },

        isActive: function () {
            var todaysDate = Date.now();
            var allocations = this.props.contractMember.allocations;
            var endDate = Date.parse(allocations[allocations.length - 1].endDate);
            var joinDate = Date.parse(allocations[allocations.length - 1].joinDate);

            if (todaysDate > joinDate && todaysDate < endDate) {
                return true;
            }

            return false;
        },

        render: function () {
            return (
                <li>
                    <a href="#" onClick={this.showModal}>
                        <img alt="avatar"
                             src="img/placeholders/avatar-2.jpg"/>
                        <div className={(this.isActive()) ? 'user-info user-active' : 'user-info user-inactive'}>
                            <span>
                            {(this.isBilled()) ? 'Billed' : 'Unbilled'}
                            </span>
                            <span className="status">
                                {(this.isActive()) ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </a>
                </li>
            )
        }
    });

    module.exports = ContractMember;
})();
