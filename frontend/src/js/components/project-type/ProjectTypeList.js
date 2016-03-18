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
    var ProjectType = require('./ProjectTypeRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var crudActions = require('../../actions/crudActions');
    var Pagination = require('../common/pagination/Pagination');


    var ProjectTypeList = React.createClass({

        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET),
                startIndex: parseInt(resourceConstant.START_INDEX)
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_TYPES, {_start: this.props.startIndex, _limit: this.props.offset});
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
        },

        refreshList: function (index) {
            var startIndex = 1 + (index -1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_TYPES, {_start: startIndex, _limit: this.props.offset});
        },

        deleteProjectType: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECT_TYPES, id);
            }
        },

        renderProjectType: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);
            return (
                <ProjectType key={key} index={startIndex||1+parseInt(key)} projectType={this.props.projectTypes[key]}
                             deleteProjectType={this.deleteProjectType}/>
            );
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Types" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_TYPES.NEW} title="Add Project Type"
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Type</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Project Type</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projectTypes).map(this.renderProjectType)}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)} refreshList={this.refreshList} />
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            projectTypes: state.crudReducer.projectTypes,
            pagination: state.crudReducer.pagination
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectTypeList);
})();