/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 6/13/16.
 */

;(function (){
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var Link = require('react-router').Link;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstants = require('../../constants/resourceConstants');
    var urlConstants = require('../../constants/urlConstants');
    var messageConstants = require('../../constants/messageConstants');

    //components
    var UserRoleRow = require('./UserRoleRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');

    //utils
    var converter = require('../../utils/converter');
    var alertBox = require('../../utils/alertBox');

    //services
    var listService = require('../../services/listService');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');

    var sortBy = '';


    var UserRoleList = React.createClass({
        getDefaultProps : function(){
            return {
                offset: parseInt(resourceConstants.OFFSET)
            }
        },

        componentWillMount: function(){
            this.fetchData(this.props.pagination.startPage);
            this.props.actions.fetch(resourceConstants.ROLES, resourceConstants.ROLES);
        },

        componentWillUnmount: function(){
            this.props.actions.clearPagination();
            this.props.actions.clearList(resourceConstants.USER_ROLES);
            this.props.actions.apiClearState();
        },

        fetchData: function (start){
            this.props.actions.fetch(resourceConstants.USER_ROLES, converter.getPathParam(resourceConstants.USER_ROLES), {
                sort: sortBy,
                start: start || 1,
                offset: this.props.offset
            });
        },

        refreshList: function (index){
            var start = 1 + (index -1) * this.props.offset;
            this.fetchData(start);
        },

        renderUserRole: function (userRole, key) {
            var startIndex = this.props.pagination.startPage + parseInt(key);

            return(
                <UserRoleRow key={key} index={startIndex || 1 + parseInt(key)}
                            userRole={userRole} roles={this.props.roles} actions={this.props.actions}/>
            )
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="User Role" routes={this.props.routes} title="User Role"
                                    apiState={this.props.apiState}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>User Role Details </h2>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-vcenter table-bordered table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>
                                            User Name
                                        </th>
                                        <th>
                                            Role
                                        </th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.userRoles.length? this.props.userRoles.map(this.renderUserRole):listService.displayNoRecordFound()}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)}
                                    selectedPage={parseInt(this.props.pagination.startPage / 10) + 1}
                                    refreshList={this.refreshList}/>
                    </div>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            userRoles: state.crudReducer.userRoles,
            pagination: state.crudReducer.pagination,
            apiState: state.apiReducer,
            roles: state.crudReducer.roles
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(UserRoleList);
})();
