/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var TeamMember = React.createClass({
        setMemberIdToBeInModal: function () {
            this.props.actions.editTeamMemberIndexInModal(this.props.index);
        },

        render: function () {
            return (
                <li><a href="#" className="profile-img img-lg" onClick={this.setMemberIdToBeInModal} data-toggle="modal"
                       data-target="#addTeam"><img
                    className="img-circle" alt="avatar"
                    src="img/placeholders/avatar.png"/></a></li>
            )
        }
    });

    module.exports = TeamMember;
})();