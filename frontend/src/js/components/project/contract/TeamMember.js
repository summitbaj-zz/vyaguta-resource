;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var TeamMember = React.createClass({
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
                                {teamMember.employee.firstName + ' ' + teamMember.employee.lastName}
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
            );
        }

    });
    module.exports = TeamMember;
})();