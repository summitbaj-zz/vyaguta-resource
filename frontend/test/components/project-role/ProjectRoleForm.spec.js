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
import _ from 'lodash';

//components
import {WrappedComponent} from '../../../src/js/components/project-role/ProjectRoleForm';
import ProjectRoleRow from '../../../src/js/components/project-role/ProjectRoleRow';
import store from '../../storeMock';

function setup(params) {
    var props = {
        selectedItem: store.getState().crudReducer.selectedItem,
        apiState: {isRequesting: false, noOfRequests: 0},
        params: params,
        actions: {
            fetchById: expect.createSpy(),
            clearSelectedItem: expect.createSpy(),
            apiClearState: expect.createSpy(),
            updateSelectedItem: expect.createSpy(),
            addItem: expect.createSpy(),
            updateItem: expect.createSpy()
        }
    }

    var ProjectRoleForm = WrappedComponent;
    var component = mount(<Provider store={store}><ProjectRoleForm {...props}/></Provider>);

    return {
        component: component,
        actions: props.actions,
        props: props
    }
}

describe('ProjectRoleForm component', () => {
    describe('componentDidMount', () => {
        it('dispatches fetchById if id is present in the params', () => {
            var {actions} = setup({id: 123});
            expect(actions.fetchById).toHaveBeenCalled();
        });

        it('doesnot dispatch fetchById if id is not present in the params', () => {
            var {actions} = setup({});
            expect(actions.fetchById).toNotHaveBeenCalled();
        });
    });

    describe('componentWillUnMount', () => {
        it('dispatches clearSelectedItem when component unmounts', () => {
            var {component, actions} = setup({});
            component.unmount();
            expect(actions.clearSelectedItem).toHaveBeenCalled();
        });

        it('dispatches apiClearState when component unmounts', () => {
            var {component, actions} = setup({});
            component.unmount();
            expect(actions.apiClearState).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('dispatches updateSelectedItem when any changes are made to the input field', () => {
            var {component, actions} = setup({});
            var inputField = component.find('#title');
            inputField.simulate('change');
            expect(actions.updateSelectedItem).toHaveBeenCalled();
        });
    });

    describe('saveProjectRole', () => {
        it('does not dispatch any action if form is not valid', () => {
            var {component, actions} = setup({});
            var form = component.find('form');
            form.simulate('submit');
            expect(actions.addItem).toNotHaveBeenCalled();
            expect(actions.updateItem).toNotHaveBeenCalled();
        });

        it('dispatches addItem if form is valid and id is not present', () => {
            var {component, actions, props} = setup({});
            var form = component.find('form');
            props.selectedItem.projectRoles.title = 'Some ProjectRole';
            component.update();
            form.simulate('submit');
            expect(actions.addItem).toHaveBeenCalled();
        });

        it('dispatches updateItem if form is valid and id is present', () => {
            var {component, actions, props} = setup({id: 123});
            var form = component.find('form');
            props.selectedItem.projectRoles.title = 'Some ProjectRole';
            component.update();
            form.simulate('submit');
            expect(actions.updateItem).toHaveBeenCalled();
        });

    });
})