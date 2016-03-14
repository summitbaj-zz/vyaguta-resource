;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var Link = require('react-router').Link;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var Client = require('./ClientRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var crudActions = require('../../actions/crudActions');


    var ClientList = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.CLIENTS);
        },

        deleteClient: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.CLIENTS, id);
            }
        },

        renderClient: function (key) {
            return (
                <Client key={key} index={key} client={this.props.clients[key]}
                             deleteClient={this.deleteClient}/>
            );
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Clients" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Client Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.CLIENTS.NEW} title="Add Client"
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Client</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Skype Id</th>
                                    <th>Address</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.clients).map(this.renderClient)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            clients: state.crudReducer.clients
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ClientList);
})();