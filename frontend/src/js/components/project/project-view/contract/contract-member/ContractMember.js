;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //libraries
    var moment = require('moment');

    var ContractMember = React.createClass({
        isActive: function () {
            var allocations = this.props.contractMember.allocations;
            var todaysDate = moment().startOf('day');

            for (var i = 0; i < allocations.length; i++) {
                var joinDate = moment(allocations[i].joinDate);
                var endDate = moment(allocations[i].endDate);

                if (todaysDate >= joinDate && todaysDate <= endDate) {
                    return true;
                }
            }
            return false;
        },

        isBilled: function () {
            if (this.isActive()) {
                var allocations = this.props.contractMember.allocations;
                var todaysDate = moment().startOf('day');

                for (var i = 0; i < allocations.length; i++) {
                    var joinDate = moment(allocations[i].joinDate);
                    var endDate = moment(allocations[i].endDate);

                    if (allocations[i].billed && todaysDate >= joinDate && todaysDate <= endDate) {
                        return 'Billed';
                    }
                }
                return 'Unbilled';
            }
            return '';
        },

        getFullName: function () {
            var middleName;
            if (this.props.contractMember.employee.middleName && this.props.contractMember.employee.middleName != 'NULL' && this.props.contractMember.employee.middleName != null) {
                middleName = this.props.contractMember.employee.middleName + ' ';
            } else {
                middleName = '';
            }

            return (this.props.contractMember.employee.firstName + ' ' + middleName + this.props.contractMember.employee.lastName);
        },

        render: function () {
            var statusClassName;
            var teamMember = this.props.contractMember;

            return (
                <li>
                    <a href="#" className="view-team" data-toggle="modal" data-target="#viewTeam"
                       onClick={this.props.setMemberToBeInModal.bind(null, teamMember)}>
                        <img alt="avatar"
                             src="img/placeholders/avatar-2.jpg"/>
                        <div className={(this.isActive()) ? 'user-info user-active' : 'user-info user-inactive'}>
                            <span>
                                {this.getFullName()}
                                </span>
                            <span>
                            {this.isBilled()}
                            </span>
                            <span className="status">
                                {(this.isActive()) ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </a>
                </li>
            );
        }
    });

    module.exports = ContractMember;

})();