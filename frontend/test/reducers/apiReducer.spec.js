/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/18/16.
 */

//libraries
import expect from 'expect';

//constants
import actionTypeConstant from '../../src/js/constants/actionTypeConstant';

//components
import apiReducer from '../../src/js/reducers/apiReducer';

describe('apiReducer', () => {
    it('should return the initial state if no action is passed', () => {
        expect(
            apiReducer(undefined, {})
        ).toEqual(
            {
                isRequesting: false,
                numberOfRequests: 0
            }
        );
    });

    it('should handle API_REQUEST', () => {
        expect(
            apiReducer(undefined, {
                type: actionTypeConstant.API_REQUEST,
                entity: 'Some Entity'
            })
        ).toEqual({
            isRequesting: true,
            numberOfRequests: 1
        });

        expect(
            apiReducer(
                {
                    isRequesting: true,
                    numberOfRequests: 1
                },
                {
                    type: actionTypeConstant.API_REQUEST,
                    entity: 'Some Entity'
                })
        ).toEqual({
            isRequesting: true,
            numberOfRequests: 2
        })
    });

    it('should handle API_RESPONSE', () => {
        expect(
            apiReducer({
                    isRequesting: true,
                    numberOfRequests: 1
                },
                {
                    type: actionTypeConstant.API_RESPONSE,
                    entity: 'Some entity'
                })
        ).toEqual({
            isRequesting: false,
            numberOfRequests: 0
        });

        expect(
            apiReducer({
                    isRequesting: true,
                    numberOfRequests: 3
                },
                {
                    type: actionTypeConstant.API_RESPONSE,
                    entity: 'Some entity'
                })
        ).toEqual({
            isRequesting: true,
            numberOfRequests: 2
        })

    });

    it('should handle API_CLEAR_STATE', () => {
        expect(
            apiReducer({
                    isRequesting: true,
                    numberOfRequests: 2
                },
                {
                    type: actionTypeConstant.API_CLEAR_STATE
                })
        ).toEqual({
            isRequesting: false,
            numberOfRequests: 0
        })

    });
});