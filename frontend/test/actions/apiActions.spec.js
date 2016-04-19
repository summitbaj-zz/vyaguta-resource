/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/16/16.
 */

//libraries
import expect from 'expect';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstant';

//components
import apiActions from '../../src/js/actions/apiActions';

describe('apiActions', () => {
    it('should create an action for an API request', () => {
        var entity = 'Some entity';
        var expectedAction = {
            type: actionTypeConstant.API_REQUEST,
            entity: entity
        };
       expect(apiActions.apiRequest(entity)).toEqual(expectedAction);
    });

    it('should create an action for an API response',() => {
        var entity = 'Some entity';
        var expectedAction = {
            type: actionTypeConstant.API_RESPONSE,
            entity: entity
        };
        expect(apiActions.apiResponse(entity)).toEqual(expectedAction);
    });

    it('should create an action for clearing the API state', () => {
        var expectedAction = {
            type: actionTypeConstant.API_CLEAR_STATE
        };
        expect(apiActions.apiClearState()).toEqual(expectedAction);
    })
})
