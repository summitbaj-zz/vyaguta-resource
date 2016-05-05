/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');

    //Components
    var ContractMember = require('./ContractMember');
    var ContractMemberForm = require('./ContractMemberForm');

    var ContractMemberContainer = React.createClass({
        getInitialState: function () {
            return {
                isModalActive: false,
                memberIndex: null
            }
        },

        setMemberIndex: function (index) {
            this.setState({memberIndex: index});
        },

        renderContractMember: function (key) {
            return (
                <ContractMember key={key}
                                index={key}
                                setMemberIndex={this.setMemberIndex}
                                toggleModalState={this.toggleModalState}
                                check={true}
                                actions={this.props.actions}
                                contractMember={this.props.contractMembers[key]}/>
            );
        },

        initializeModal: function(event) {
            event.preventDefault();
            this.props.actions.initializeContractMember();
            this.toggleModalState();
        },

        toggleModalState: function () {
            this.setState({isModalActive: (this.state.isModalActive) ? false : true})
        },

        render: function () {
            return (
                <div>
                    <div className="form-group">
                        <label className="control-label">Contract Members</label>
                        <div className="row  text-center">
                            <div className="col-sm-12">
                                <div className="user-list-widget">
                                    <ul className="user-list list-medium">
                                        {this.props.contractMembers && Object.keys(this.props.contractMembers).map(this.renderContractMember)}
                                        <li>
                                            <a href="#"
                                               className="add-team"
                                               data-target="#addTeam"
                                               onClick={this.initializeModal}>
                                                <i className="fa fa-plus"></i>
                                                <span className="on-hover"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isModalActive &&
                    <ContractMemberForm toggleModalState={this.toggleModalState}
                                        actions={this.props.actions}
                                        selectedContractMember={this.props.selectedContractMember}
                                        memberIndex = {this.state.memberIndex}
                                        setMemberIndex = {this.setMemberIndex}
                                        contractIndex={this.props.contractIndex}
                                        projectRoles={this.props.projectRoles}
                                        employees={this.props.employees}/>
                    }
                </div>
            );
        }
    });

    module.exports = ContractMemberContainer;

})();