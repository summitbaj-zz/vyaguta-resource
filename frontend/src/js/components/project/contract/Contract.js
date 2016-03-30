/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */


;(function() {

    //React and Redux dependencies
    var React = require('react');


    var Contract = React.createClass({
        render: function() {
            return (
                <div class="block-chunk">
                    <div class="block-title-border">Contract Details
                        <div class="block-options"> <a href="#" class="btn btn-alt btn-sm btn-default"><i class="fa fa-plus"></i></a> </div>
                    </div>
                    <div class="form-group clearfix">
                        <div class="row multiple-element">

                            <div className="col-md-6 col-lg-4 element">
                                <label className=" control-label">Budget Type</label>
                                <select className="form-control"
                                        ref="budgetType" name="budgetType"
                                        id="budgetType"
                                        value={this.props.selectedItem.projects.budgetType &&
                                                               this.props.selectedItem.projects.budgetType.id}
                                        onChange={this.handleChange}>
                                    <option value="0">
                                        Please Select
                                    </option>
                                    {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}
                                </select>
                                <span className="help-block"></span>
                            </div>

                            <div className="col-md-6 col-lg-4 element">
                                <label className="control-label">Contract Date</label>
                                <div data-date-format="mm/dd/yyyy"
                                     className="input-group input-daterange">
                                    <DatePicker selected={this.state.startDate}
                                                onChange={this.handleChangeStartDate}
                                                className="form-control"
                                                placeholderText="From"
                                                popoverTargetOffset='40px 0px'
                                                disabled={this.props.apiState.isRequesting}
                                    />
                                                <span className="input-group-addon"><i
                                                    className="fa fa-angle-right"></i></span>
                                    <DatePicker selected={this.state.endDate}
                                                onChange={this.handleChangeEndDate}
                                                className="form-control"
                                                minDate={this.state.startDate}
                                                placeholderText="To"
                                                popoverTargetOffset='40px 0px'
                                                disabled={this.props.apiState.isRequesting}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="form-group">
                        <label>Contracted Resources</label>
                        <textarea placeholder="No. of contracted resources" class="form-control" rows="4"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Team Members</label>
                        <div class="row  text-center">
                            <div class="col-sm-12">
                                <div class="user-list-widget">
                                    <ul class="user-list list-medium">
                                        <li class="user-active"> <a href="#"> <img alt="avatar" src="img/placeholders/avatar-2.jpg">
                                            <div class="user-info"> <span>Billed</span> <span class="status">Active</span> </div>
                                        </a> </li>
                                        <li class="user-active"> <a href="#"> <img alt="avatar" src="img/placeholders/avatar-2.jpg">
                                            <div class="user-info"> <span>Billed</span> <span class="status">Active</span>  </div>
                                        </a> </li>
                                        <li class="user-inactive"> <img alt="avatar" src="img/placeholders/avatar-2.jpg">
                                            <div class="user-info"> <span>Billed</span> <span class="status">Inactive</span> </div> </li>
                                        <li> <a href="#" class="add-team" data-toggle="modal" data-target="#addTeam"><i class="fa fa-plus"></i> <span class="on-hover"></span> </a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
})();