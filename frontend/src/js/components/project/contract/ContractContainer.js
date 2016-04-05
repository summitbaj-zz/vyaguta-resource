/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */


;(function () {

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //components
    var Contract = require('./Contract');

    //actions
    var crudActions = require('../../../actions/crudActions');
    var apiActions = require('../../../actions/apiActions');
    var contractActions = require('../../../actions/contractActions');
    var contractMemberActions = require('../../../actions/contractMemberActions');
    var allocationActions = require('../../../actions/allocationActions');

    var ContractContainer = React.createClass({
        addContract: function (event) {
            event.preventDefault();
            this.props.actions.addContract();
        },

        renderContract: function (key) {
            return <Contract key={key}
                             index={key}
                             actions={this.props.actions}
                             params={this.props.params}
                             employees={this.props.employees}
                             budgetTypes={this.props.budgetTypes}
                             projectRoles={this.props.projectRoles}
                             contract={this.props.contracts[key]}
                             totalContracts={this.props.contracts.length}
                             selectedItem={this.props.selectedItem}
                             apiState={this.props.apiState}
                             selectedContractMember={this.props.selectedContractMember}
            />
        },

        render: function () {
            return (
                <div className="block-chunk">
                    <div className="block-title-border">Contract Details
                        <div className="block-options">
                            <a href="#"
                               className="btn btn-alt btn-sm btn-default"
                               onClick={this.addContract}>
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="panel-group custom-accordion" id="contractAccordion"
                             aria-multiselectable="true">

                            {Object.keys(this.props.contracts).map(this.renderContract)}

                        </div>
                    </div>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            employees: state.crudReducer.employees,
            budgetTypes: state.crudReducer.budgetTypes,
            projectRoles: state.crudReducer.projectRoles,
            selectedItem: state.crudReducer.selectedItem,
            apiState: state.apiReducer,
            contracts: state.contractReducer.contracts,
            allocations: state.contractReducer.allocations,
            selectedContractMember: state.contractReducer.selectedContractMember
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({},
                crudActions,
                apiActions,
                contractActions,
                contractMemberActions,
                allocationActions), dispatch)
        }
    };
    module.exports = connect(mapStateToProps, mapDispatchToProps)(ContractContainer);
})();
