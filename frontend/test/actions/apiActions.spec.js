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
import apiActions from '../../src/js/actions/apiActions';

describe('apiActions', () => {
    it('should create an action for an API request', () => {
        var expectedAction = {
            type: actionTypeConstant.API_REQUEST,
        };
       expect(apiActions.apiRequest()).toEqual(expectedAction);
    });

    it('should create an action for an API response',() => {
        var entity = 'Some entity';
        var expectedAction = {
            type: actionTypeConstant.API_RESPONSE,
        };
        expect(apiActions.apiResponse()).toEqual(expectedAction);
    });

    it('should create an action for clearing the API state', () => {
        var expectedAction = {
            type: actionTypeConstant.API_CLEAR_STATE
        };
        expect(apiActions.apiClearState()).toEqual(expectedAction);
    })
})
