import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';

//components
import FreeResourceItem from '../../../../src/js/components/dashboard/free-resource/FreeResourceItem';
import dashboardUtil from '../../../../src/js/services/dashboardService';

dashboardUtil.getEmployeeName = expect.createSpy().andReturn('Bishal Shrestha');
function setup() {
    var props = {
        resource: {availableAllocation: 0.25, designation: 'engineer'},
    }

    var component = mount(<FreeResourceItem {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('EndingProjectRow component', () => {
    describe('render', () => {
        it('calls getEmployeeName of dashboardUtil', () => {
            var {props} = setup();
            expect(dashboardUtil.getEmployeeName).toHaveBeenCalledWith(props.resource);
        });

        it('render two span items', () => {
            var {component} = setup();
            var span = component.find('span');
            expect(span.length).toEqual(2);
        });

        it('render one h3 item', () => {
            var {component} = setup();
            var span = component.find('h3');
            expect(span.length).toEqual(1);
        });

        it('renders employeeName correctly', () => {
            var {component} = setup();
            var employeeName = component.find('h3').text();
            expect(employeeName).toEqual('Bishal Shrestha');
        });

        it('renders available allocation correctly', () => {
            var {component} = setup();
            var availableAllocation = component.find('.cards-counts').text();
            expect(availableAllocation).toEqual('25%');
        });

        it('renders designation correctly', () => {
            var {component} = setup();
            var designation = component.find('.cards-text').text();
            expect(designation).toEqual('engineer');
        });
    });
});