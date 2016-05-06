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

//components
import {WrappedComponent} from '../../../src/js/components/client/ClientForm';
import ClientRow from '../../../src/js/components/client/ClientRow';
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
            submitForm: expect.createSpy()
        }
    }

    var ClientForm = WrappedComponent;
    var component = mount(<Provider store={store}><ClientForm {...props}/></Provider>);

    return {
        component: component,
        actions: props.actions,
        props: props
    }
}

describe('ClientForm component', () => {
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
        it('dispatches updateSelectedItem when any changes are made to the name field', () => {
            var {component, actions} = setup({});
            var inputField = component.find('#name');
            inputField.simulate('change');
            expect(actions.updateSelectedItem).toHaveBeenCalled();
        });

        it('dispatches updateSelectedItem when any changes are made to the email field', () => {
            var {component, actions} = setup({});
            var inputField = component.find('#email');
            inputField.simulate('change');
            expect(actions.updateSelectedItem).toHaveBeenCalled();
        });

        it('dispatches updateSelectedItem when any changes are made to the phoneNo field', () => {
            var {component, actions} = setup({});
            var inputField = component.find('#phoneNo');
            inputField.simulate('change');
            expect(actions.updateSelectedItem).toHaveBeenCalled();
        });

        it('dispatches updateSelectedItem when any changes are made to the skype field', () => {
            var {component, actions} = setup({});
            var inputField = component.find('#skype');
            inputField.simulate('change');
            expect(actions.updateSelectedItem).toHaveBeenCalled();
        });
    });

    describe('saveClient', () => {
        it('does not dispatch any action if form is not valid (with no client name and email)', () => {
            var {component, actions} = setup({});
            var form = component.find('form');
            form.simulate('submit');
            expect(actions.submitForm).toNotHaveBeenCalled();
        });

        it('does not dispatch any action if form is not valid (with client name but no email)', () => {
            var {component, actions, props} = setup({});
            var form = component.find('form');
            props.selectedItem.clients.name = 'Some Client';
            form.simulate('submit');
            expect(actions.submitForm).toNotHaveBeenCalled();
        });

        it('does not dispatch any action if form is not valid (with client email but no name)', () => {
            var {component, actions, props} = setup({});
            var form = component.find('form');
            props.selectedItem.clients.email = 'client@client.com';
            form.simulate('submit');
            expect(actions.submitForm).toNotHaveBeenCalled();
        });

        it('dispatches submitForm if form is valid', () => {
            var {component, actions, props} = setup({});
            var form = component.find('form');
            props.selectedItem.clients.name = 'Some Client';
            props.selectedItem.clients.email = 'client@client.com';
            component.update();
            form.simulate('submit');
            expect(actions.submitForm).toHaveBeenCalled();
        });
    });
})