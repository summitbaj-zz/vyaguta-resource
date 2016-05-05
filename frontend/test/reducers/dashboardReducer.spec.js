//libraries
import expect from 'expect';
import _ from 'lodash';

//constants
import actionTypeConstants from '../../src/js/constants/actionTypeConstants';

//components
import dashboardReducer from '../../src/js/reducers/dashboardReducer';

var initialState = {
    projectEnding: [],
    overdue: [],
    inProgressProjects: [],
    resource: {
        utilization: {},
        booked: [],
        available: []
    }
};
var tempState;

var testData = {data: [{id: 1, title: 'Some data'}, {id: 2, title: 'SomeData'}]};

describe('dashboardReducer', () => {
    beforeEach(() => {
        tempState = _.cloneDeep(initialState);
    });

    it('should return the initial state if no action is passed', () => {
        expect(dashboardReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LIST_BY_CRITERIA', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.overdue = testData.data;

        expect(dashboardReducer(undefined,
            {
                type: actionTypeConstants.LIST_BY_CRITERIA,
                criteria: 'overdue',
                data: testData.data
            })
        ).toEqual(expectedState);
    });

    it('should handle SHOW_RESOURCES', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.resource.booked = testData.data;

        expect(dashboardReducer(undefined,
            {
                type: actionTypeConstants.SHOW_RESOURCES,
                entity: 'resource',
                resourceType: 'booked',
                data: testData.data
            })
        ).toEqual(expectedState);
    });
});

