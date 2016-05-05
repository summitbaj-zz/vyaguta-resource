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
import {WrappedComponent} from '../../../src/js/components/client/ClientList';
import ClientRow from '../../../src/js/components/client/ClientRow';
import store from '../../storeMock';

function setup() {
    var props = {
        clients: [{id: 1, title: 'client1'}, {id: 2, title: 'client2'}],
        pagination: {},
        actions: {
            fetch: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy(),
            clearList: expect.createSpy()
        }
    }
    var ClientList = WrappedComponent;
    var component = mount(<Provider store={store}><ClientList {...props}/></Provider>);

    return {
        component: component,
        clients: props.clients,
        actions: props.actions,
        clientRow: component.find(ClientRow)
    }
}

describe('ClientList Component', () => {
    describe('componentDidMount', () => {
        it('dispatches fetchByQuery action on componentDidMount', () => {
            var {actions} = setup();
            expect(actions.fetch).toHaveBeenCalled();
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

    describe('renderClient', () => {
        it('renders all the client rows', () => {
            var {clientRow, clients} = setup();
            expect(clientRow.length).toEqual(clients.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when client name heading is clicked', () => {
            var {actions, component} = setup();
            var clientName = component.find('#name');
            clientName.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });

        it('calls sort() function when client email heading is clicked', () => {
            var {actions, component} = setup();
            var clientEmail = component.find('#email');
            clientEmail.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });

        it('calls sort() function when client phoneNo heading is clicked', () => {
            var {actions, component} = setup();
            var clientPhoneNo = component.find('#phoneNo');
            clientPhoneNo.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });

        it('calls sort() function when client skype heading is clicked', () => {
            var {actions, component} = setup();
            var clientSkype = component.find('#skype');
            clientSkype.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });
    })

    describe('deleteClient', () => {
        it('opens a confirm box when delete button is pressed', () => {
            var {actions, component, clientRow} = setup();
            var deleteButton = clientRow.find('button').first();
            deleteButton.simulate('click');
            var confirmBox = $('.jconfirm-box');
            expect(confirmBox.length).toBeGreaterThan(0);
        });

        it('dispatches deleteItem action when yes button is pressed in confirm box', () => {
            var {actions, component, clientRow} = setup();
            var deleteButton = clientRow.find('button').first();
            deleteButton.simulate('click');
            var yesButton = $('.jconfirm-box .btn-success');
            yesButton.click();
            expect(actions.deleteItem).toHaveBeenCalled();
        });

        it('does not dispatch deleteItem action when cancel button is pressed in confirm box', () => {
            var {actions, component, clientRow} = setup();
            var deleteButton = clientRow.find('button').first();
            deleteButton.simulate('click');
            var cancelButton = $('.jconfirm-box .btn-danger');
            cancelButton.click();
            expect(actions.deleteItem).toNotHaveBeenCalled();
        });
    });
});
