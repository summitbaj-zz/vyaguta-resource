;(function () {
    'use strict';

    var React = require('react');

    var ReasonModal = React.createClass({
        render: function () {
            return (
                <div className="modal fade" id="addReason" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="modal-title">Reason</div>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                        <textarea name="reason" ref="reason" id="reason"
                                                  placeholder="Please enter the reason for editing this project."
                                                  className="form-control" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-success" onClick={this.props.updateProject} id="save-btn"><i
                                    className="fa fa-angle-right"></i>Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    });
    module.exports = ReasonModal;
})();