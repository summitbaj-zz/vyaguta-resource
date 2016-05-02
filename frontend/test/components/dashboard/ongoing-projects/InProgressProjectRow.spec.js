import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import InProgressProjectRow from '../../../../src/js/components/dashboard/ongoing-projects/InProgressProjectRow';

function setup() {
    var props = {
        project: {
            title: 'fake', projectType: {id: 1, title: 'client'},
            projectStatus: {id: 1, title: 'In Progress', color: '#ffffff'}
        },
        index: 1
    }

    var component = mount(<table><InProgressProjectRow {...props}/></table>);
    return {
        component: component,
        props: props
    }
}

describe('EndingProjectRow component', () => {
    describe('render', () => {
        it('render one tr item', () => {
            var {component} = setup();
            var tr = component.find('tr');
            expect(tr.length).toEqual(1);
        });

        it('render five td items', () => {
            var {component} = setup();
            var td = component.find('td');
            expect(td.length).toEqual(5);
        });

        it('renders correct index', () => {
            var {component} = setup();
            var index = component.find('tr').childAt(0).text();
            expect(index).toEqual('1');
        });

        it('renders correct title', () => {
            var {component} = setup();
            var index = component.find('tr').childAt(1).text();
            expect(index).toEqual('fake');
        });

        it('renders correct project type', () => {
            var {component} = setup();
            var index = component.find('tr').childAt(2).text();
            expect(index).toEqual('client');
        });

        it('renders correct project status', () => {
            var {component} = setup();
            var index = component.find('tr').childAt(3).text();
            expect(index).toEqual('In Progress');
        });
    });
});