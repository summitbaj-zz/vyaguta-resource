/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');

    //components
    var ContractMemberForm = require('./ContractMemberForm');

    var ContractMember = React.createClass({
        showModal:function(event) {
            event.preventDefault();
            this.props.actions.listAllocations(this.props.contractMember.allocation);
            this.props.toggleModalState(event);
        },

        render: function () {
            return (
                <li className="user-active">
                    <a href="#" onClick={this.showModal}>
                        <img alt="avatar"
                             src="img/placeholders/avatar-2.jpg"/>
                        <div className="user-info">
                            <span>Billed</span>
                            <span className="status">Active</span>
                        </div>
                    </a>
                </li>
            )
        }
    });

    module.exports = ContractMember;
})();
