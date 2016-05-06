import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import OverdueProjectRow from '../../../../src/js/components/dashboard/overdue-projects/OverdueProjectRow';

function setup() {
    var props = {
        overdueProject: {
            projectTitle: 'fake',
            projectStatus: 'In Progress',
            projectStatusColor: '#fffffff',
            endDate: '2016-09-09'
        },
        index: 1
    }

    var component = mount(<OverdueProjectRow {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('OverdueProjectRow component', () => {
    describe('render', () => {
        it('render one li item', () => {
            var {component} = setup();
            var tr = component.find('li');
            expect(tr.length).toEqual(1);
        });

        it('render three span items', () => {
            var {component} = setup();
            var td = component.find('span');
            expect(td.length).toEqual(3);
        });

        it('renders correct title', () => {
            var {component} = setup();
            var index = component.find('li').childAt(0).text();
            expect(index).toEqual('fake');
        });

        it('renders correct project status', () => {
            var {component} = setup();
            var index = component.find('li').childAt(1).text();
            expect(index).toEqual('In Progress');
        });

        it('renders correct end date', () => {
            var {component} = setup();
            var index = component.find('li').childAt(2).text();
            expect(index).toEqual('9th September 2016');
        });
    });
});