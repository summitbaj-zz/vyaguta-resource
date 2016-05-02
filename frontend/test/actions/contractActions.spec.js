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
import contractActions from '../../src/js/actions/contractActions';


describe('contractActions', () => {
    it('should create an action to add a contract', () => {
        var expectedAction = {
            type: actionTypeConstant.ADD_CONTRACT
        };
        expect(contractActions.addContract()).toEqual(expectedAction);
    });

    it('should create an action to handle changes in the contract', () => {
        var index = 1;
        var key = 'Some key';
        var value = 'Some value';
        var expectedAction = {
            type: actionTypeConstant.HANDLE_CONTRACT_CHANGE,
            index: index,
            key: key,
            value: value
        };
        expect(contractActions.handleContractChange(index, key, value)).toEqual(expectedAction);
    });

    it('should create an action to handle select option changes in contract',() => {
        var index = 1;
        var key = 'Some key';
        var value = 'Some value';
        var expectedAction = {
            type: actionTypeConstant.HANDLE_CONTRACT_SELECT_OPTION_CHANGE,
            index: index,
            key: key,
            value: value
        };
        expect(contractActions.handleContractSelectOptionChange(index, key, value)).toEqual(expectedAction);
    });

    it('should create an action to delete a contrat', () => {
        var index = 1;
        var expectedAction = {
            type: actionTypeConstant.DELETE_CONTRACT,
            index: index
        };
        expect(contractActions.deleteContract(index)).toEqual(expectedAction);
    });

    it('should create an action to clear all contracts', () => {
        var expectedAction = {
            type: actionTypeConstant.CLEAR_CONTRACTS
        };
        expect(contractActions.clearContracts()).toEqual(expectedAction);
    })


})

