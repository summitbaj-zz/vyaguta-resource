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
import {WrappedComponent} from '../../../src/js/components/project/ProjectList';
import ProjectRow from '../../../src/js/components/project/ProjectRow';
import store from '../../storeMock';

function setup() {
    var props = {
        projects: [{id: 1, title: 'project1'}, {id: 2, title: 'project2'}],
        pagination: {},
        actions: {
            fetch: expect.createSpy(),
            clearPagination: expect.createSpy(),
            apiClearState: expect.createSpy(),
            deleteItem: expect.createSpy(),
            clearList: expect.createSpy()
        }
    }
    var ProjectList = WrappedComponent;
    var component = mount(<Provider store={store}><ProjectList {...props}/></Provider>);

    return {
        component: component,
        projects: props.projects,
        actions: props.actions,
        projectRow: component.find(ProjectRow)
    }
}

describe('ProjectList Component', () => {
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

    describe('renderProject', () => {
        it('renders all the project rows', () => {
            var {projectRow, projects} = setup();
            expect(projectRow.length).toEqual(projects.length);
        });
    });

    describe('sort', () => {
        it('calls sort() function when project table heading is clicked', () => {
            var {actions, component} = setup();
            var projectHeading = component.find('#title');
            projectHeading.simulate('click');
            expect(actions.fetch).toHaveBeenCalled();
        });
    })
});
