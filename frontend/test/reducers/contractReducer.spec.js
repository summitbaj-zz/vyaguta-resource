/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/18/16.
 */

//libraries
import expect from 'expect';
import _ from 'lodash';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstants';

//components
import contractReducer from '../../src/js/reducers/contractReducer';

var initialState = {
    contracts: [{
        budgetType: null,
        startDate: null,
        endDate: null,
        resource: null,
        contractMembers: []
    }],
    contractsForView: [],
    allocations: [],
    selectedContractMember: {}
};

var testData = [{id: 1, title: 'Some Title'}, {id: 2, title: 'Some Other Title'}];
var index = 0;
var key = 'budgetType';
var value = 'Some Value';
var tempState;

describe('contractReducer', () => {
    beforeEach(() => {
        tempState = _.cloneDeep(initialState);
    });

    it('should return the initial state if no action is passed', () => {
        expect(contractReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_CONTRACT', () => {
        var expectedState = _.cloneDeep(tempState);
        var emptyContractObject = {
            budgetType: null,
            startDate: null,
            endDate: null,
            resource: null,
            contractMembers: []
        };
        expectedState.contracts.push(emptyContractObject);

        expect(contractReducer(undefined, {
                type: actionTypeConstant.ADD_CONTRACT
            })
        ).toEqual(expectedState);

    });

    it('should handle SELECT_ITEM', () => {
        var expectedState = _.cloneDeep(tempState);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.SELECT_ITEM
            })
        ).toEqual(expectedState);
    });

    it('should handle HANDLE_CONTRACT_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts[index][key] = value;

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_CONTRACT_CHANGE,
                index: index,
                key: key,
                value: value
            })
        ).toEqual(expectedState);
    });

    it('should handle HANDLE_CONTRACT_SELECT_OPTION_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts[index][key] = {id: value};

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_CONTRACT_SELECT_OPTION_CHANGE,
                index: index,
                key: key,
                value: value
            })
        ).toEqual(expectedState);
    });

    it('should handle DELETE_CONTRACT', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts = _.cloneDeep(testData);
        expectedState.contracts.splice(index, 1);

        tempState.contracts = _.cloneDeep(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.DELETE_CONTRACT,
                index: index
            })
        ).toEqual(expectedState);
    });

    it('should handle INITIALIZE_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        var emptyContractMemberObject = {
            employee: null,
            allocations: [{
                role: null,
                joinDate: null,
                endDate: null,
                allocation: null,
                billed: false
            }]
        };
        expectedState.selectedContractMember = emptyContractMemberObject;

        expect(contractReducer(tempState, {
                type: actionTypeConstant.INITIALIZE_CONTRACT_MEMBER
            })
        ).toEqual(expectedState);
    });

    it('should handle ADD_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts[index].contractMembers.push(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.ADD_CONTRACT_MEMBER,
                index: index,
                data: testData
            })
        ).toEqual(expectedState);
    });

    it('should handle UPDATE_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts[index].contractMembers.push(testData);
        expectedState.contracts[index].contractMembers[index] = testData[0];

        tempState.contracts[index].contractMembers.push(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.UPDATE_CONTRACT_MEMBER,
                contractIndex: index,
                memberIndex: index,
                data: testData[0]
            })
        ).toEqual(expectedState);

    });

    it('should handle DELETE_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts[index].contractMembers.push(testData);
        expectedState.contracts[index].contractMembers.splice(index, 1);

        tempState.contracts[index].contractMembers.push(testData);

        expect(contractReducer(undefined, {
                type: actionTypeConstant.DELETE_CONTRACT_MEMBER,
                contractIndex: index,
                memberIndex: index
            })
        ).toEqual(expectedState);

    });

    it('should handle ADD_ALLOCATION', () => {
        var expectedState = _.cloneDeep(tempState);
        var emptyAllocationObject = {
            role: null,
            joinDate: null,
            endDate: null,
            allocation: null,
            billed: false
        }
        expectedState.selectedContractMember.allocations = [];
        expectedState.selectedContractMember.allocations.push(emptyAllocationObject);

        tempState.selectedContractMember.allocations = [];
        expect(contractReducer(tempState, {
                type: actionTypeConstant.ADD_ALLOCATION
            })
        ).toEqual(expectedState);
    });

    it('should handle DELETE_ALLOCATION', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedContractMember.allocations = [];
        expectedState.selectedContractMember.allocations.push(testData);
        expectedState.selectedContractMember.allocations.splice(index, 1);

        tempState.selectedContractMember.allocations = [];
        tempState.selectedContractMember.allocations.push(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.DELETE_ALLOCATION,
                index: index
            })
        ).toEqual(expectedState);

    })
    ;

    it('should handle SELECT_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedContractMember = testData;

        expect(contractReducer(tempState, {
                type: actionTypeConstant.SELECT_CONTRACT_MEMBER,
                contractMember: testData
            })
        ).toEqual(expectedState);

    });

    it('should handle CLEAR_CONTRACTS', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.contracts = [{
            budgetType: null,
            startDate: null,
            endDate: null,
            resource: null,
            contractMembers: []
        }];

        expect(contractReducer(tempState, {
                type: actionTypeConstant.CLEAR_CONTRACTS
            })
        ).toEqual(expectedState);

    });

    it('should handle CLEAR_CONTRACT_MEMBER', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedContractMember = {};

        expect(contractReducer(undefined, {
                type: actionTypeConstant.CLEAR_CONTRACT_MEMBER
            })
        ).toEqual(expectedState);

    });

    it('should handle HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        var employeeFullName = "Pratish Bahadur Shrestha";
        var employeeName = employeeFullName.split(' ');

        expectedState.selectedContractMember[key] = {
            id: index,
            firstName: employeeName[0],
            middleName: employeeName[1],
            lastName: employeeName[2]
        }

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE,
                key: key,
                employeeId: index,
                employeeFullName: employeeFullName
            })
        ).toEqual(expectedState);

        var employeeFullName = "Pratish Shrestha";
        var employeeName = employeeFullName.split(' ');

        expectedState.selectedContractMember[key] = {
            id: index,
            firstName: employeeName[0],
            lastName: employeeName[1]
        }

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE,
                key: key,
                employeeId: index,
                employeeFullName: employeeFullName
            })
        ).toEqual(expectedState);

    });

    it('should handle HANDLE_ALLOCATION_SELECT_OPTION_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedContractMember.allocations = [];
        expectedState.selectedContractMember.allocations.push(testData);
        expectedState.selectedContractMember.allocations[index][key] = {id: value}

        tempState.selectedContractMember.allocations = [];
        tempState.selectedContractMember.allocations.push(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_ALLOCATION_SELECT_OPTION_CHANGE,
                index: index,
                key: key,
                value: value
            })
        ).toEqual(expectedState);

    });

    it('should handle HANDLE_ALLOCATION_INPUT_CHANGE', () => {
        var expectedState = _.cloneDeep(tempState);
        expectedState.selectedContractMember.allocations = [];
        expectedState.selectedContractMember.allocations.push(testData);
        expectedState.selectedContractMember.allocations[index][key] = value;

        tempState.selectedContractMember.allocations = [];
        tempState.selectedContractMember.allocations.push(testData);

        expect(contractReducer(tempState, {
                type: actionTypeConstant.HANDLE_ALLOCATION_INPUT_CHANGE,
                index: index,
                key: key,
                value: value
            })
        ).toEqual(expectedState);
    });
})
;