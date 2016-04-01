;(function () {
    'use-strict';
    //React and Redux dependencies
    var React = require('react');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var HistoryItem = require('./HistoryItem');

    var History = React.createClass({
        getInitialState: function () {
            return {
                history: [
                    {
                        id: 1,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 2,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 3,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 4,
                        type: 'contract',
                        projectId: '1',
                        changes: {
                            budgetType: {id: 2, title: 'fixed'},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 5,
                        type: 'contract',
                        projectId: '1',
                        changes: {
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 6,
                        type: 'contractMember',
                        projectId: '1',
                        changes: {
                            allocation: 100,
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 7,
                        type: 'contractMember',
                        projectId: '1',
                        add: {
                            allocation: 100,
                            endDate: '1212-34-43',
                            startDate: '2323-34-44'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 8,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 9,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    },
                    {
                        id: 10,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 11,
                        type: 'project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }
                ]
            }
        },

        renderHistoryItems: function (history) {
            return (
                <HistoryItem history={history} key={history.id}/>
            );
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="History" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block clearfix">
                                <div className="block full">
                                    <div className="block-title">
                                        <h2>History</h2>
                                    </div>
                                    <div className="timeline block-content-full">
                                        <ul className="timeline-list timeline-hover">
                                            {this.state.history.map(this.renderHistoryItems)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    module.exports = History;
})();
