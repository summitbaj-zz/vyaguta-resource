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

    //libraries
    var moment = require('moment');

    var ContractMember = React.createClass({
        showModal: function (event) {
            event.preventDefault();
            this.props.setMemberIndex(this.props.index);
            this.props.actions.selectContractMember(this.props.contractMember);
            this.props.toggleModalState();
        },

        isBilled: function () {
            var allocations = this.props.contractMember.allocations;
            var todaysDate = moment();

            for (var i = 0; i < allocations.length; i++) {
                var joinDate = moment(allocations[allocations.length - 1].joinDate).subtract(1, 'd');
                var endDate = moment(allocations[allocations.length - 1].endDate).add(1, 'd');

                if (allocations[i].billed && todaysDate >= joinDate - 1 && todaysDate <= endDate + 1) {
                    return true;
                }
            }

            return false;
        },

        isActive: function () {
            var allocations = this.props.contractMember.allocations;
            var todaysDate = moment();

            for (var i = 0; i < allocations.length; i++) {
                var joinDate = moment(allocations[allocations.length - 1].joinDate).subtract(1, 'd');
                var endDate = moment(allocations[allocations.length - 1].endDate).add(1, 'd');

                if (todaysDate >= joinDate - 1 && todaysDate <= endDate + 1) {
                    return true;
                }
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

                            </span>
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
