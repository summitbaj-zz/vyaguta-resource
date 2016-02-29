/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    var React = require('react');
    var ProjectHeader = require('./ProjectHeader');
    var TechnologyStack = require('./TechnologyStack');
    var ApiUtil = require('../../util/ApiUtil');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var ReactTags = require('react-tag-input').WithContext;
    var abc = require('./jqueryfile');


    var ProjectForm = React.createClass({
        getInitialState: function () {
            return {
                technologyStack: [],
            }
        },

        checkTag: function (value) {
            var techStack = this.state.technologyStack;
            for (var i = 0; i < techStack.length; i++) {
                if (techStack[i].toLowerCase() == value.toLowerCase()) {
                    return i;
                }
            }
            return null;
        },

        addNewTag: function (value) {
            this.state.technologyStack.push(value);
            this.setState({technologyStack: this.state.technologyStack});
        },

        removeTag: function (tag) {
            var techStack = this.state.technologyStack;
            var index = this.checkTag(tag);
            if (index != null) {
                techStack.splice(index, 1);
            }
            this.setState({technologyStack: techStack});
        },

        render: function () {
            return (
                <div>
                    <ProjectHeader title="Add Project" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="block-title-border">Project Details</div>
                                <form className="form-bordered" method="post">
                                    <div className="form-group has-success">
                                        <label>Project Name</label>
                                        <input type="text" placeholder="Project Name" className="form-control"/>
                                        <span className="help-block">Project name available</span></div>
                                    <div className="form-group">
                                        <label>Description</label>
                                    <textarea placeholder="Short description about the project."
                                              className="form-control" rows="4"></textarea>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Project Type</label>
                                                <select className="form-control">
                                                    <option value="0">Please select</option>
                                                    <option value="1">Service</option>
                                                    <option value="2">Product</option>
                                                    <option value="3">Internal</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className=" control-label">Budget Type</label>
                                                <select className="form-control">
                                                    <option value="0">Please select</option>
                                                    <option value="1">Fixed</option>
                                                    <option value="2">Resource Based</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Account Manager</label>
                                                <input type="text" placeholder="Account Manager Name"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label for="example-select" className="control-label">Project
                                                    Status</label>
                                                <select className="form-control">
                                                    <option value="0">Please select</option>
                                                    <option value="1">Pending</option>
                                                    <option value="2">Executing</option>
                                                    <option value="3">Closed</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Contract Date</label>
                                                <div data-date-format="mm/dd/yyyy"
                                                     className="input-group input-daterange">
                                                    <input type="text" placeholder="From"
                                                           className="form-control text-center"/>
                                                <span className="input-group-addon"><i
                                                    className="fa fa-angle-right"></i></span>
                                                    <input type="text" placeholder="To"
                                                           className="form-control text-center"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <label className="control-label">Technology Stack</label>
                                        <TechnologyStack technologyStack={this.state.technologyStack}
                                                         checkTag={this.checkTag}
                                                         removeTag={this.removeTag} addNewTag={this.addNewTag}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Resources</label>
                                        <div className="row multiple-element">
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="block-options clear"><a
                                                className="btn btn-sm btn-ghost text-uppercase" data-toggle="tooltip"
                                                title="Add Another Field" href="#"><i className="fa fa-plus"></i> Add
                                                Another Field</a></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Team Members</label>
                                        <div className="row  text-center">
                                            <div className="col-sm-12">
                                                <ul className="team-list clearfix">
                                                    <li><a href="#" className="profile-img img-lg add-team"
                                                           data-toggle="modal" data-target="#addTeam"><i
                                                        className="fa fa-plus"></i> <span
                                                        className="on-hover circular-block"></span> </a>

                                                    </li>
                                                    <li><a href="#" className="profile-img img-lg"><img
                                                        className="img-circle" alt="avatar"
                                                        src="dist/img/placeholders/avatar.png"/></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-actions clearfix">
                                        <div className="pull-right">
                                            <button className="btn btn-sm btn-success" type="submit"><i
                                                className="fa fa-angle-right"></i>Save
                                            </button>
                                            <button className="btn btn-sm btn-default" type="reset"><i
                                                className="fa fa-repeat"></i>Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = ProjectForm
})();