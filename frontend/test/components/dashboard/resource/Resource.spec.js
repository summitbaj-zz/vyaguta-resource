import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import Resource from '../../../../src/js/components/dashboard/resource/Resource';
import dashboardUtil from '../../../../src/js/services/dashboardService';

dashboardUtil.calculatePercentage = expect.createSpy().andReturn('50%');

function setup() {
    var props = {
        resource: {totalResource: 5, freeResource: 2, bookedResource: {bookedResourceCount: 3, billed: 2, unbilled: 3}}
    }

    var component = mount(<Resource {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('Resource component', () => {
    describe('render', () => {
        it('calls calculatePercentage of dashboardUtil', () => {
            var {props} = setup();
            expect(dashboardUtil.calculatePercentage).toHaveBeenCalledWith(props.resource.bookedResource.billed, props.resource.bookedResource.bookedResourceCount);
            expect(dashboardUtil.calculatePercentage).toHaveBeenCalledWith(props.resource.bookedResource.unbilled, props.resource.bookedResource.bookedResourceCount);
        });
    });
});
