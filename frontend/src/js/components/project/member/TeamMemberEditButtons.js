/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/1/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var TeamMemberEditButtons = React.createClass({
        render: function () {
            return (
                <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-ghost" id="close-btn"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-sm btn-success" onClick={this.props.addMember}><i
                        className="fa fa-pencil-square-o"></i>Update
                    </button>
                    <button type="button" className="btn btn-sm btn-danger" onClick={this.props.removeMember}><i
                        className="fa fa-times"></i>Remove Team Member
                    </button>
                </div>
            )
        }
    });

    module.exports = TeamMemberEditButtons;
})();