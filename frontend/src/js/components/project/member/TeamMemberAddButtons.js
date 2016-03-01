/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/1/16.
 */

;(function() {
    'use strict';

    var React = require('react');

    var TeamMemberAddButtons = React.createClass({
        render:function() {
            return (
                <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-ghost" id="close-btn"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" className="btn btn-sm btn-success" onClick={this.props.addMember}><i
                        className="fa fa-plus"></i>Add
                        Team Member
                    </button>
                </div>
            )
        }
    });

    module.exports = TeamMemberAddButtons;
})();