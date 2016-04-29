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
import contractMemberAction from '../../src/js/actions/contractMemberActions';

describe('contractMemberAction', () => {
    it('should create an action to add a contract member', () => {
        var index = 1;
        var data = 'Some data';
        var expectedAction = {
            type: actionTypeConstant.ADD_CONTRACT_MEMBER,
            index: index,
            data: data
        };
        expect(contractMemberAction.addContractMember(index, data)).toEqual(expectedAction);
    });

    it('should create an action to update a contract member', () => {
        var contractIndex = 1;
        var memberIndex = 1;
        var data = 'Some data';
        var expectedAction = {
            type: actionTypeConstant.UPDATE_CONTRACT_MEMBER,
            contractIndex: contractIndex,
            memberIndex: memberIndex,
            data: data
        };
        expect(contractMemberAction.updateContractMember(contractIndex, memberIndex, data)).toEqual(expectedAction);
    });

    it('should create an action to initialize a contract member', () => {
        var expectedAction = {
            type: actionTypeConstant.INITIALIZE_CONTRACT_MEMBER
        };
        expect(contractMemberAction.initializeContractMember()).toEqual(expectedAction);
    })

    it('should create an action to select a contract member', () => {
        var contractMember = 'Some contract Member';
        var expectedAction = {
            type: actionTypeConstant.SELECT_CONTRACT_MEMBER,
            contractMember: contractMember
        };
        expect(contractMemberAction.selectContractMember(contractMember)).toEqual(expectedAction);
    })

    it('should create an action to handle a contract member select option change', () => {
        var key = 1;
        var employeeId = 1;
        var employeeFullName = 'Some name';
        var expectedAction = {
            type: actionTypeConstant.HANDLE_CONTRACT_MEMBER_SELECT_OPTION_CHANGE,
            key: key,
            employeeId: employeeId,
            employeeFullName: employeeFullName
        };
        expect(contractMemberAction.handleContractMemberSelectOptionChange(key, employeeId, employeeFullName)).toEqual(expectedAction);
    })

    it('should create an action to delete a contract member', () => {
        var contractIndex = 1;
        var memberIndex = 1;
        var expectedAction = {
            type: actionTypeConstant.DELETE_CONTRACT_MEMBER,
            contractIndex: contractIndex,
            memberIndex: memberIndex
        };
        expect(contractMemberAction.deleteContractMember(contractIndex, memberIndex)).toEqual(expectedAction);
    })

    it('should create an action to clear all contract members', () => {
        var expectedAction = {
            type:actionTypeConstant.CLEAR_CONTRACT_MEMBER
        };
        expect(contractMemberAction.clearContractMember()).toEqual(expectedAction);
    })
})
