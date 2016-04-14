;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //libraries
    var moment = require('moment');

    var TeamMember = React.createClass({
        isActive: function () {
            var allocations = this.props.contractMember.allocations;
            var todaysDate = moment();

            for (var i = 0; i < allocations.length; i++) {
                var joinDate = moment(allocations[i].joinDate).subtract(1, 'd');
                var endDate = moment(allocations[i].endDate).add(1, 'd');

                if (todaysDate >= joinDate - 1 && todaysDate <= endDate + 1) {
                    return true;
                }
            }

            return false;
        },

        isBilled: function () {
            if (this.isActive()) {
                var allocations = this.props.contractMember.allocations;
                var todaysDate = moment();

                for (var i = 0; i < allocations.length; i++) {
                    var joinDate = moment(allocations[i].joinDate).subtract(1, 'd');
                    var endDate = moment(allocations[i].endDate).add(1, 'd');

                    if (allocations[i].billed && todaysDate >= joinDate - 1 && todaysDate <= endDate + 1) {
                        return 'Billed';
                    }
                }

                return 'Unbilled';
            }

            return '';
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
    module.exports = TeamMember;
})();