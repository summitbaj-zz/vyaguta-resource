;(function () {
    'use strict';

    //React dependencies
    var React = require('react');


    var TeamMemberView = React.createClass({

        renderAllocation: function (key) {
            var teamMemberAllocation = this.props.selectedTeamMember.allocations[key];
            return (
                <tr key={key}>
                    <td>{++key}</td>
                    <td>{teamMemberAllocation.role && teamMemberAllocation.role.title}</td>
                    <td>{teamMemberAllocation.allocation}</td>
                    <td>{teamMemberAllocation.joinDate}</td>
                    <td>{teamMemberAllocation.endDate}</td>
                    <td>{teamMemberAllocation.billed ? 'Yes' : 'No'}</td>
                </tr>
            );
        },

        render: function () {
            var teamMember = this.props.selectedTeamMember;
            if (teamMember.allocation)
                var allocationIds = Object.keys(teamMember.allocation);
            return (
                <div className="modal fade" id="viewTeam" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="modal-title">{teamMember.employee && teamMember.employee.id}</div>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive">
                                    <table className="table table-vcenter table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Role</th>
                                            <th>Allocation</th>
                                            <th>Join Date</th>
                                            <th>End Date</th>
                                            <th>Billed</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teamMember.allocations && Object.keys(teamMember.allocations).map(this.renderAllocation)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-danger" data-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });
    module.exports = TeamMemberView;
})();
