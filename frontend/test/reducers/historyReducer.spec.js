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
import historyReducer from '../../src/js/reducers/historyReducer';

describe('historyReducer', () => {
    it('should return the initial state if no action is passed', () => {
        expect(historyReducer(undefined, {})).toEqual(
            {
                project: []
            }
        )
    });

    it('should handle LIST_HISTORY', () => {
        var data = [{title: 'project1'}, {title: 'project2'}];
        var newData = [{title: 'project1'}, {title: 'project2'}, {title: 'project3'}];

        expect(
            historyReducer(undefined,
                {
                    type: actionTypeConstant.LIST_HISTORY,
                    entity: 'Some Entity',
                    data: data
                })
        ).toEqual(
            {
                project: data
            }
        );

        expect(
            historyReducer(
                {
                    project: data
                },
                {
                    type: actionTypeConstant.LIST_HISTORY,
                    entity: 'Some Entity',
                    data: newData
                })
        ).toEqual(
            {
                project: newData
            }
        );
    });


    it('should handle CLEAR_HISTORY', () => {
        var data = [{title: 'project1'}, {title: 'project2'}];

        expect(
            historyReducer(
                {
                    project: data
                },
                {
                    type:actionTypeConstant.CLEAR_HISTORY
                }
            )
        ).toEqual(
            {
                project: []
            }
        )
    })
})