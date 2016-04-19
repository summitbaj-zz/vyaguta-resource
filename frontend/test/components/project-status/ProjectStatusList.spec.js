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
import {WrappedComponent} from '../../../src/js/components/project-status/ProjectStatusList';
import ProjectStatusRow from '../../../src/js/components/project-status/ProjectStatusRow';
import store from '../../storeMock';

function setup() {
    var props = {
        projectStatus: [{id: 1, title: 'projectStatus'}, {id: 2, title: 'projectStatus'}],
        pagination: {},
        actions: {
            fetchByQuery: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy()
        }
    }
    var ProjectStatusList = WrappedComponent;
    var component = mount(<Provider store={store}><ProjectStatusList {...props}/></Provider>);

    return {
        component: component,
        projectStatus: props.projectStatus,
        actions: props.actions,
        projectStatusRow: component.find(ProjectStatusRow)
    }
}

describe('ProjectStatusList Component', () => {
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
    });

    describe('renderProjectStatus', () => {
        it('renders all the projectStatus rows', () => {
            var {projectStatusRow, projectStatus} = setup();
            expect(projectStatusRow.length).toEqual(projectStatus.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when projectStatus table heading is clicked', () => {
            var {actions, component} = setup();
            var projectStatusHeading = component.find('#title');
            projectStatusHeading.simulate('click');
            expect(actions.fetchByQuery).toHaveBeenCalled();
        });
    })

    describe('deleteProjectStatus', () => {
        it('opens a confirm box when delete button is pressed', () => {
            var {actions, component, projectStatusRow} = setup();
            var deleteButton = projectStatusRow.find('button').first();
            deleteButton.simulate('click');
            var confirmBox = $('.jconfirm-box');
            expect(confirmBox.length).toBeGreaterThan(0);
        });

        it('dispatches deleteItem action when yes button is pressed in confirm box', () => {
            var {actions, component, projectStatusRow} = setup();
            var deleteButton = projectStatusRow.find('button').first();
            deleteButton.simulate('click');
            var yesButton = $('.jconfirm-box .btn-success');
            yesButton.click();
            expect(actions.deleteItem).toHaveBeenCalled();
        });

        it('does not dispatch deleteItem action when cancel button is pressed in confirm box', () => {
            var {actions, component, projectStatusRow} = setup();
            var deleteButton = projectStatusRow.find('button').first();
            deleteButton.simulate('click');
            var cancelButton = $('.jconfirm-box .btn-danger');
            cancelButton.click();
            expect(actions.deleteItem).toNotHaveBeenCalled();
        });
    });
});
