import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';

//components
import EndingProjectRow from '../../../../src/js/components/dashboard/ending-projects/EndingProjectRow';

function setup() {
    var props = {
        endingProject: {project: 'fake', endDate: '2049-03-04', resources: 2},
    }

    var component = mount(<EndingProjectRow {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('EndingProjectRow component', () => {
    describe('render', () => {
        it('renders one list item', () => {
            var {component} = setup();
            var li = component.find('li');
            expect(li.length).toEqual(1);
        });

        it('render four span items', () => {
            var {component} = setup();
            var span = component.find('span');
            expect(span.length).toEqual(3);
        });

        it('renders project name correctly', () => {
            var {component} = setup();
            var projectName = component.find('.list-group-project').text();
            expect(projectName).toEqual('fake');
        });

        it('renders end date correctly', () => {
            var {component} = setup();
            var endDate = component.find('li').childAt(1);
            expect(endDate.text()).toEqual('2049-03-04');
        });

        it('renders resource count correctly', () => {
            var {component} = setup();
            var resource = component.find('li').childAt(2);
            expect(resource.text()).toEqual('2');
        });
    });
});