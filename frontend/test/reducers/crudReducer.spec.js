/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/18/16.
 */

//libraries
import expect from 'expect';
import _ from 'lodash';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstant';

//components
import crudReducer from '../../src/js/reducers/crudReducer';

var initialState = {
    projectStatus: [],
    budgetTypes: [],
    projectTypes: [],
    projects: [],
    projectRoles: [],
    clients: [],
    selectedItem: { //for editing or viewing purposes
        projects: {
            budgetType: {},
            projectType: {},
            projectStatus: {},
            accountManager: {},
            client: {},
            contracts: []
        },
        projectRoles: {},
        budgetTypes: {},
        projectTypes: {},
        clients: {},
        projectStatus: {}
    },
    pagination: {}
};
var tempState;

var testData = {data: [{id: 1, title: 'Some data'}, {id: 2, title: 'SomeData'}]};
var entity = 'budgetTypes';

describe('crudReducer', () => {
    beforeEach(() => {
        tempState = _.cloneDeep(initialState);
    });

    it('should return the initial state if no action is passed', () => {
        expect(crudReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LIST', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.budgetTypes = testData.data;

        expect(crudReducer(undefined,
            {
                type: actionTypeConstant.LIST,
                entity: 'budgetTypes',
                data: testData
            })
        ).toEqual(expectedState);
    });

    it('should handle SELECT_ITEM', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedItem[entity] = testData.data;

        expect(crudReducer(undefined,
            {
                type: actionTypeConstant.SELECT_ITEM,
                entity: entity,
                data: testData.data
            })
        ).toEqual(expectedState);

    });

    it('should handle DELETE', () => {
        var expectedState = _.cloneDeep(tempState);
        var id = 1;

        tempState.budgetTypes = _.cloneDeep(testData.data);
        expectedState.budgetTypes = _.cloneDeep(testData.data);
        expectedState.budgetTypes.splice(0, 1);

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.DELETE,
                entity: entity,
                id: id
            })
        ).toEqual(expectedState);

    });

    it('should handle UPDATE_SELECTED_ITEM', () => {
        var expectedState = _.cloneDeep(tempState);
        var key = 'title';
        var value = 'Updated Title';

        expectedState.selectedItem.budgetTypes = _.cloneDeep(testData.data[0]);
        expectedState.selectedItem.budgetTypes.title = value;
        tempState.selectedItem.budgetTypes = _.cloneDeep(testData.data[0]);

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.UPDATE_SELECTED_ITEM,
                entity: entity,
                key: key,
                value: value
            })
        ).toEqual(expectedState);

    });

    it('should handle HANDLE_SELECT_OPTION_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        var key = 'title';
        var value = 'Updated title';

        expectedState.selectedItem.budgetTypes = _.cloneDeep(testData.data[0]);
        expectedState.selectedItem.budgetTypes.title = {id: value};
        tempState.selectedItem.budgetTypes = _.cloneDeep(testData.data[0]);

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.HANDLE_SELECT_OPTION_CHANGE,
                entity: entity,
                key: key,
                value: value
            })
        ).toEqual(expectedState);

    });

    it('should handle CLEAR_SELECTED_ITEM', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedItem.budgetTypes = {};

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.CLEAR_SELECTED_ITEM,
                entity: entity
            })
        ).toEqual(expectedState);
    });

    it('should handle PAGINATION_INDEX', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.pagination.page = 1;
        expectedState.pagination.count = 2;

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.PAGINATION_INDEX,
                index: 1,
                count: 2
            })
        ).toEqual(expectedState);
    });

    it('should handle HANDLE_AUTOCOMPLETE_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        var label = "Pratish Bahadur Shrestha";
        var employeeName = label.split(' ');
        var id = 1;
        var key = 'employee'

        expectedState.selectedItem[entity][key] = {
            id: id,
            firstName: employeeName[0],
            middleName: employeeName[1],
            lastName: employeeName[2]
        }

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.HANDLE_AUTOCOMPLETE_CHANGE,
                entity: entity,
                key: key,
                id: id,
                label: label
            })
        ).toEqual(expectedState);

        var label = "Pratish Shrestha";
        var employeeName = label.split(' ');

        expectedState.selectedItem[entity][key] = {
            id: id,
            firstName: employeeName[0],
            lastName: employeeName[1]
        };

        expect(crudReducer(tempState,
            {
                type: actionTypeConstant.HANDLE_AUTOCOMPLETE_CHANGE,
                entity: entity,
                key: key,
                id: id,
                label: label
            })
        ).toEqual(expectedState);


    })
});

