;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var TeamMember = React.createClass({
        render: function () {
            var statusClassName;
            var teamMember = this.props.teamMember;
            if (teamMember.status == 'active') {
                statusClassName = 'user-active';
            } else {
                statusClassName = 'user-inactive';
            }
            return (
                <li key={teamMember.id}>
                    <a href="#" className="view-team" data-toggle="modal" data-target="#viewTeam" onClick={this.props.setMemberToBeInModal.bind(null, this.props.teamMember)}>
                        <div className={statusClassName}>
                            <img alt="avatar" src="img/placeholders/avatar-2.jpg"/>
                            <div className="user-info">
                                <span>{teamMember.billed ? 'Billed' : 'Unbilled'}</span>
                                <span className="status">{teamMember.status}</span>
                            </div>
                        </div>
                    </a>
                </li>
            );
        }

    });
    module.exports = TeamMember;
})();