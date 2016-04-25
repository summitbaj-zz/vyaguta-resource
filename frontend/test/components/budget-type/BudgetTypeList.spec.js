/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/19/16.
 */

//libraries
import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import jsdom from 'jsdom';

//components
import {WrappedComponent} from '../../../src/js/components/budget-type/BudgetTypeList';
import BudgetTypeRow from '../../../src/js/components/budget-type/BudgetTypeRow';
import store from '../../storeMock';

function setup() {
    var props = {
        budgetTypes: [{id: 1, title: 'budgettype1'}, {id: 2, title: 'budgettype2'}],
        pagination: {},
        actions: {
            fetchByQuery: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy(),
            clearList: expect.createSpy()
        }
    }
    var BudgetTypeList = WrappedComponent;
    var component = mount(<Provider store={store}><BudgetTypeList {...props}/></Provider>);

    return {
        component: component,
        budgetTypes: props.budgetTypes,
        actions: props.actions,
        budgetTypeRow: component.find(BudgetTypeRow)
    }
}

describe('BudgetTypeList Component', () => {
    describe('componentDidMount', () => {
        it('dispatches fetchByQuery action on componentDidMount', () => {
            var {actions} = setup();
            expect(actions.fetchByQuery).toHaveBeenCalled();
        });
    });

    describe('componentWillUnmount', () => {
        it('dispatches clearPagination action when component unmounts', () => {
            var {component, actions} = setup();
            component.unmount();
            expect(actions.clearPagination).toHaveBeenCalled();
        });

        it('dispatches apiClearState action when component unmounts', () => {
            var {component, actions} = setup();
            component.unmount();
            expect(actions.apiClearState).toHaveBeenCalled();
        });

        it('dispatches clearList action when component unmounts', () => {
            var {component, actions} = setup();
            component.unmount();
            expect(actions.clearList).toHaveBeenCalled();
        });
    });

    describe('renderBudgetType', () => {
        it('renders all the budgetType rows', () => {
            var {budgetTypeRow, budgetTypes} = setup();
            expect(budgetTypeRow.length).toEqual(budgetTypes.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when budgetType table heading is clicked', () => {
            var {actions, component} = setup();
            var budgetTypeHeading = component.find('#title');
            budgetTypeHeading.simulate('click');
            expect(actions.fetchByQuery).toHaveBeenCalled();
        });
    })

    describe('deleteBudgetType', () => {
        it('opens a confirm box when delete button is pressed', () => {
            var {actions, component, budgetTypeRow} = setup();
            var deleteButton = budgetTypeRow.find('button').first();
            deleteButton.simulate('click');
            var confirmBox = $('.jconfirm-box');
            expect(confirmBox.length).toBeGreaterThan(0);
        });

        it('dispatches deleteItem action when yes button is pressed in confirm box', () => {
            var {actions, component, budgetTypeRow} = setup();
            var deleteButton = budgetTypeRow.find('button').first();
            deleteButton.simulate('click');
            var yesButton = $('.jconfirm-box .btn-success');
            yesButton.click();
            expect(actions.deleteItem).toHaveBeenCalled();
        });

        it('does not dispatch deleteItem action when cancel button is pressed in confirm box', () => {
            var {actions, component, budgetTypeRow} = setup();
            var deleteButton = budgetTypeRow.find('button').first();
            deleteButton.simulate('click');
            var cancelButton = $('.jconfirm-box .btn-danger');
            cancelButton.click();
            expect(actions.deleteItem).toNotHaveBeenCalled();
        });
    });
});
