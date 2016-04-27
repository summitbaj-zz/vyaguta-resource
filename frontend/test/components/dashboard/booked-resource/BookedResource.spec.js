import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';
import _ from 'lodash';

//components
import BookedResourceComponent from '../../../../src/js/components/dashboard/booked-resource/BookedResource';
import BookedResourceItem from '../../../../src/js/components/dashboard/booked-resource/BookedResourceItem';

function setup() {
    var props = {
        resource: [{foo: 'bar', numberOfProjects: 2}, {foo: 'bar2', numberOfProjects: 2}]
    }

    var component = mount(<BookedResourceComponent {...props}/>);
    return {
        component: component,
        props: props,
    }
}

describe('BookedResource component', () => {
    describe('renderResourceByProjectType', () => {
        it('returns correct component', () => {
            var {component, props} = setup();
            var actual = component.instance().renderResourceByProjectType(2, 0);
            var expected = <BookedResourceItem resource={props.resource[0]} key='0' total='2'/>;
            expect(actual).toEqual(expected);
        });

        it('renders all booked resource', () => {
            var {component, props} = setup();
            var total = component.find(BookedResourceItem).length;
            expect(total).toEqual(props.resource.length);
        });
    });

    describe('calculateTotalResource', () => {
        it('returns correct total number of projects', () => {
            var {component} = setup();
            var totalResources = component.instance().calculateTotalResource();
            expect(totalResources).toEqual(4);
        });
    });
});