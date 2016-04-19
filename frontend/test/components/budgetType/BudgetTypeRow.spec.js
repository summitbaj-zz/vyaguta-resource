/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/18/16.
 */

//libraries
import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

//components
import BudgetTypeRow from '../../../src/js/components/budget-type/BudgetTypeRow';


function setup() {
    var props = {
        index: 1,
        budgetType: {id: 1, title: 'Some Budgettype'},
        deleteBudgetType: expect.createSpy()
    }
    var component = shallow(<BudgetTypeRow {...props}/>);

    return {
        component: component,
        deleteButton: component.find('button'),
        tableData: component.find('td'),
        props: props
    }
}

describe('BudgetTypeRow Component', () => {
    it('renders a delete button', () => {
        var {deleteButton} = setup();
        expect(deleteButton.length).toEqual(1);
    });


    it('should call deleteBudgetType method when the delete button is clicked', () => {
        var {deleteButton, props}  = setup();
        deleteButton.simulate('click');
        expect(props.deleteBudgetType).toHaveBeenCalled();
    });
})