;(function () {
    'use strict';

    //React dependencies
    var React = require('react');


    var TeamMemberView = React.createClass({
        getAllocation: function (key) {
            return (
                <div className="panel panel-default" key={key}>
                    <div className="panel-heading" role="tab" id={"allocation-heading" + key}>
                        <h4 className="panel-title"><a role="button" data-toggle="collapse"
                                                       data-parent="#accordion"
                                                       href={"#allocation-collapse" + key}
                                                       aria-expanded="true"
                                                       aria-controls={"allocation-collapse" + key}>
                            Allocation </a></h4>
                    </div>
                    <div id={"allocation-collapse" + key} className="panel-collapse collapse" role="tabpanel"
                         aria-labelledby={"allocation-heading" + key}>
                        <div className="panel-body">
                            <div className="block-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Role </span>
                                                <p>{this.props.selectedTeamMember.allocation[key].role.title}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Allocation </span>
                                                <p>{this.props.selectedTeamMember.allocation[key].allocation}</p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> Start Date </span>
                                                <p>{this.props.selectedTeamMember.allocation[key].startDate}</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span
                                                className="view-label"> {this.props.selectedTeamMember.allocation[key].endDate} </span>
                                                <p>asddf</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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
                                <div className="modal-title">{teamMember.name}</div>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="panel-group custom-accordion" id="accordion" role="tablist"
                                         aria-multiselectable="true">
                                        {teamMember.allocation && allocationIds.map(this.getAllocation)}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-ghost" data-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-sm btn-success"><i className="fa fa-plus"></i>Save
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
