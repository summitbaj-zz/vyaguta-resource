/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/16/16.
 */

//libraries
import expect from 'expect';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstants';

//components
import allocationActions from '../../src/js/actions/allocationActions';
import crudActions from '../../src/js/actions/allocationActions';


describe('allocationActions', () => {
    it('should create an action to add an allocation', () => {
        var expectedAction = {
            type: actionTypeConstant.ADD_ALLOCATION
        };
        expect(allocationActions.addAllocation()).toEqual(expectedAction);
    });

    it('should create an action to list all the allocations', () => {
        var allocations = {};
        var expectedAction = {
            type: actionTypeConstant.LIST_ALLOCATIONS,
            allocations: allocations
        };
        expect(allocationActions.listAllocations(allocations)).toEqual(expectedAction);
    });

    it('should create an action to handle select option changes in allocation', () => {
        var index = 1;
        var key = 'Some key';
        var value = 'Some value';
        var expectedAction = {
            type: actionTypeConstant.HANDLE_ALLOCATION_SELECT_OPTION_CHANGE,
            index: index,
            key: key,
            value: value
        };
        expect(allocationActions.handleAllocationSelectOptionChange(index, key, value)).toEqual(expectedAction);
    });

    it('should create an action to handle allocation input changes',() => {
        var index = 1;
        var key = 'Some key';
        var value = 'Some value';
        var expectedAction = {
            type: actionTypeConstant.HANDLE_ALLOCATION_INPUT_CHANGE,
            index: index,
            key: key,
            value: value
        };
        expect(allocationActions.handleAllocationInputChange(index, key, value)).toEqual(expectedAction);
    });

    it('should create an action to delete an allocation', () => {
        var index = 1;
        var expectedAction = {
            type: actionTypeConstant.DELETE_ALLOCATION,
            index: index
        }
        expect(allocationActions.deleteAllocation(index)).toEqual(expectedAction);
    });

    it('should create an action to clear all allocations', () => {
        var expectedAction = {
            type: actionTypeConstant.CLEAR_ALLOCATIONS
        }
        expect(allocationActions.clearAllocations()).toEqual(expectedAction);
    })


})

