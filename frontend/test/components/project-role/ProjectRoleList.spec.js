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
import {WrappedComponent} from '../../../src/js/components/project-role/ProjectRoleList';
import ProjectRoleRow from '../../../src/js/components/project-role/ProjectRoleRow';
import store from '../../storeMock';

function setup() {
    var props = {
        projectRoles: [{id: 1, title: 'projectrole1'}, {id: 2, title: 'projectrole2'}],
        pagination: {},
        actions: {
            fetch: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy(),
            clearList: expect.createSpy()
        }
    }
    var ProjectRoleList = WrappedComponent;
    var component = mount(<Provider store={store}><ProjectRoleList {...props}/></Provider>);

    return {
        component: component,
        projectRoles: props.projectRoles,
        actions: props.actions,
        projectRoleRow: component.find(ProjectRoleRow)
    }
}

describe('ProjectRoleList Component', () => {
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

        describe('renderProjectRole', () => {
        it('renders all the ProjectRole rows', () => {
            var {projectRoleRow, projectRoles} = setup();
            expect(projectRoleRow.length).toEqual(projectRoles.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when ProjectRole table heading is clicked', () => {
            var {actions, component} = setup();
            var ProjectRoleHeading = component.find('#title');
            ProjectRoleHeading.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });
    })

    describe('deleteProjectRole', () => {
        it('opens a confirm box when delete button is pressed', () => {
            var {actions, component, projectRoleRow} = setup();
            var deleteButton = projectRoleRow.find('button').first();
            deleteButton.simulate('click');
            var confirmBox = $('.jconfirm-box');
            expect(confirmBox.length).toBeGreaterThan(0);
        });

        it('dispatches deleteItem action when yes button is pressed in confirm box', () => {
            var {actions, component, projectRoleRow} = setup();
            var deleteButton = projectRoleRow.find('button').first();
            deleteButton.simulate('click');
            var yesButton = $('.jconfirm-box .btn-success');
            yesButton.click();
            expect(actions.deleteItem).toHaveBeenCalled();
        });

        it('does not dispatch deleteItem action when cancel button is pressed in confirm box', () => {
            var {actions, component, projectRoleRow} = setup();
            var deleteButton = projectRoleRow.find('button').first();
            deleteButton.simulate('click');
            var cancelButton = $('.jconfirm-box .btn-danger');
            cancelButton.click();
            expect(actions.deleteItem).toNotHaveBeenCalled();
        });
    });
});
