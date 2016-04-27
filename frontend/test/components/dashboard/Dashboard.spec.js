import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import jsdom from 'jsdom';
import _ from 'lodash';

//components
import DashboardComponent from '../../../src/js/components/dashboard/Dashboard';
import store from '../../storeMock';


function setup() {
    var props = {
        projects: store.getState().dashboardReducer.inProgressProjects,
        endingProjects: store.getState().dashboardReducer.projectEnding,
        overdueProjects: store.getState().dashboardReducer.overdue,
        resource: store.getState().dashboardReducer.resource,
        apiState: store.getState().apiReducer,
        actions: {
            fetchByField: expect.createSpy(),
            fetchByEndDate: expect.createSpy(),
            fetchOverdueProjects: expect.createSpy(),
            fetchResourceCount: expect.createSpy(),
            apiClearState: expect.createSpy()
        }
    }

    var addDayInDate = function (value) {
        var today = new Date();
        var newDate = new Date();
        newDate.setDate(today.getDate() + value);
        return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
    }

    var Dashboard = DashboardComponent.WrappedComponent;
    var component = mount(<Dashboard {...props}/>);
    return {
        component: component,
        actions: props.actions,
        props: props,
        addDayInDate: addDayInDate
    }
}

describe('Dashboard component', () => {
    describe('wrapperComponent', () => {
        it('fetches correct states from store', () => {
            var MountedDashboard = mount(<DashboardComponent store={store}/>);
            var expectedState = {
                projects: [],
                endingProjects: [],
                overdueProjects: [],
                resource: {
                    utilization: {},
                    booked: [],
                    available: []
                },
                apiState: {
                    isRequesting: false,
                    numberOfRequests: 0
                }
            };
            expect(MountedDashboard.node.stateProps).toEqual(expectedState);
        });
    });

    describe('componentDidMount', () => {
        it('dispatches fetchByField', () => {
            var {actions} = setup();
            expect(actions.fetchByField).toHaveBeenCalledWith('projects', 'projectStatus', 'In Progress');
        });

        it('dispatches fetchByEndDate', () => {
            var {actions, addDayInDate} = setup();
            var request = 'btn' + addDayInDate(0) + 'and' + addDayInDate(15);
            expect(actions.fetchByEndDate).toHaveBeenCalledWith('dashboard', 'projectEnding', request);
        });

        it('dispatches fetchOverdueProjects', () => {
            var {actions} = setup();
            expect(actions.fetchOverdueProjects).toHaveBeenCalledWith('projects', 'overdue');
        });

        it('dispatches fetchResourceCount for resource utilization', () => {
            var {actions} = setup();
            expect(actions.fetchResourceCount).toHaveBeenCalledWith('resource', 'utilization');
        });

        it('dispatches fetchResourceCount for booked resource', () => {
            var {actions} = setup();
            expect(actions.fetchResourceCount).toHaveBeenCalledWith('resource', 'booked');
        });

        it('dispatches fetchResourceCount for available resource', () => {
            var {actions} = setup();
            expect(actions.fetchResourceCount).toHaveBeenCalledWith('resource', 'available');
        });
    });
    describe('componentWillUnMount', () => {
        it('dispatches apiClearState when component unmounts', () => {
            var {component, actions} = setup({});
            component.unmount();
            expect(actions.apiClearState).toHaveBeenCalled();
        });
    });

    describe('addDayInDate', () => {
        it('returns correctly added date', () => {
            var {component, addDayInDate} = setup();
            var instance = component.instance();
            expect(instance.addDayInDate(1)).toEqual(addDayInDate(1));
        });
    });
});