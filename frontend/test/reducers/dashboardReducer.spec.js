//libraries
import expect from 'expect';
import _ from 'lodash';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstants';

//components
import dashboardReducer from '../../src/js/reducers/dashboardReducer';

var initialState = {
    projectEnding: [],
    overdue: [],
    inProgressProjects: [],
    resource: {
        utilization:{},
        booked:[],
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

    it('should handle LIST_BY_DATE', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.overdue = testData.data;

        expect(dashboardReducer(undefined,
            {
                type: actionTypeConstant.LIST_BY_DATE,
                projectType: 'overdue',
                data: testData.data
            })
        ).toEqual(expectedState);
    });

    it('should handle LIST_PROJECT_BY_STATUS', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.inProgressProjects = testData.data.data;

        expect(dashboardReducer(undefined,
            {
                type: actionTypeConstant.LIST_PROJECT_BY_STATUS,
                data: testData.data
            })
        ).toEqual(expectedState);

    });

    it('should handle SHOW_RESOURCES', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.resource.booked = testData.data;

        expect(dashboardReducer(undefined,
            {
                type: actionTypeConstant.SHOW_RESOURCES,
                entity: 'resource',
                resourceType: 'booked',
                data: testData.data
            })
        ).toEqual(expectedState);

    });
});

