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
                        type: 'Project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03',
                        reason: 'asldkjfffffffffffffffffffffl dddddddddddddddddddddddddddd kllllllllllllllllllllllll sdfjldsjlfjl jl jflsdj jlsdj ljsd ljl fjlsdjfljsdlffjsldfj'
                    }, {
                        id: 2,
                        type: 'Contract',
                        title: 'Phase 1',
                        projectId: '1',
                        add: {
                            budgetType:{id:2, title:'asdf'},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 3,
                        type: 'Project',
                        projectId: '1',
                        changes: {
                            accountManager: {firstName: 'asdf', middleName: 'sdf', lastName: 'asdf', id: 2},
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03',
                        reason: 'There is no reason for this change because tihs lisdf lser asr oiu lkerjs ljldkfjqq'
                    }, {
                        id: 4,
                        type: 'Contract',
                        title: 'Phase 2',
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
                        type: 'Contract',
                        title: 'Phase 1',
                        projectId: '1',
                        changes: {
                            startDate: '334-3434-3434',
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 6,
                        type: 'Contract Member',
                        projectId: '1',
                        changes: {
                            allocation: 100,
                            endDate: '1212-34-43'
                        },
                        createdBy: 'Bishal shrestha',
                        createdAt: '2049-02-03'
                    }, {
                        id: 7,
                        type: 'Contract Member',
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
                        type: 'Project',
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
                        type: 'Project',
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
                        type: 'Project',
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
                        type: 'Project',
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
