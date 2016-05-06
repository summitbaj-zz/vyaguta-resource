import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';
import _ from 'lodash';

//components
import BookedResourceComponent from '../../../../src/js/components/dashboard/booked-resource/BookedResource';
import BookedResourceItem from '../../../../src/js/components/dashboard/booked-resource/BookedResourceItem';
import dashboardUtil from '../../../../src/js/services/dashboardService';

dashboardUtil.calculateTotalResource = expect.createSpy();
function setup() {
    var props = {
        resource: [{foo: 'bar', numberOfProjects: 2}, {foo: 'bar2', numberOfProjects: 2}]
    }

    var component = mount(<BookedResourceComponent {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('BookedResource component', () => {
    describe('render', () => {
        it('calls calculateTotalResource of dashboardUtil', () => {
            var {props} = setup();
            expect(dashboardUtil.calculateTotalResource).toHaveBeenCalledWith(props.resource);
        });
    });

    describe('renderResourceByProjectType', () => {
        it('returns correct component', () => {
            var {component, props, spy} = setup();
            var actual = component.instance().renderResourceByProjectType(2, 0);
            var expected = <BookedResourceItem resource={props.resource[0]} key='0' total='2'/>;
            expect(actual).toEqual(expected);
        });

        it('returns no record found item if there are no records', () =>{
            var component = mount(<BookedResourceComponent resource={[]}/>);
            var output = component.find('.not-found-message');
            expect(output.length).toEqual(1);
        });

        it('renders all booked resource', () => {
            var {component, props} = setup();
            var total = component.find(BookedResourceItem).length;
            expect(total).toEqual(props.resource.length);
        });
    });
});