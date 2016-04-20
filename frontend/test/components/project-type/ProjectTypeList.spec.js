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
import {WrappedComponent} from '../../../src/js/components/project-type/ProjectTypeList';
import ProjectTypeRow from '../../../src/js/components/project-type/ProjectTypeRow';
import store from '../../storeMock';

function setup() {
    var props = {
        projectTypes: [{id: 1, title: 'projecttype1'}, {id: 2, title: 'projecttype2'}],
        pagination: {},
        actions: {
            fetchByQuery: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy(),
            clearList: expect.createSpy()
        }
    }
    var ProjectTypeList = WrappedComponent;
    var component = mount(<Provider store={store}><ProjectTypeList {...props}/></Provider>);

    return {
        component: component,
        projectTypes: props.projectTypes,
        actions: props.actions,
        projectTypeRow: component.find(ProjectTypeRow)
    }
}

describe('ProjectTypeList Component', () => {
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

    describe('renderProjectType', () => {
        it('renders all the projectType rows', () => {
            var {projectTypeRow, projectTypes} = setup();
            expect(projectTypeRow.length).toEqual(projectTypes.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when projectType table heading is clicked', () => {
            var {actions, component} = setup();
            var projectTypeHeading = component.find('#title');
            projectTypeHeading.simulate('click');
            expect(actions.fetchByQuery).toHaveBeenCalled();
        });
    })

    describe('deleteProjectType', () => {
        it('opens a confirm box when delete button is pressed', () => {
            var {actions, component, projectTypeRow} = setup();
            var deleteButton = projectTypeRow.find('button').first();
            deleteButton.simulate('click');
            var confirmBox = $('.jconfirm-box');
            expect(confirmBox.length).toBeGreaterThan(0);
        });

        it('dispatches deleteItem action when yes button is pressed in confirm box', () => {
            var {actions, component, projectTypeRow} = setup();
            var deleteButton = projectTypeRow.find('button').first();
            deleteButton.simulate('click');
            var yesButton = $('.jconfirm-box .btn-success');
            yesButton.click();
            expect(actions.deleteItem).toHaveBeenCalled();
        });

        it('does not dispatch deleteItem action when cancel button is pressed in confirm box', () => {
            var {actions, component, projectTypeRow} = setup();
            var deleteButton = projectTypeRow.find('button').first();
            deleteButton.simulate('click');
            var cancelButton = $('.jconfirm-box .btn-danger');
            cancelButton.click();
            expect(actions.deleteItem).toNotHaveBeenCalled();
        });
    });
});
