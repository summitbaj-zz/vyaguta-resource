/*
import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import Resource from '../../../../src/js/components/dashboard/resource/Resource';

function setup() {
    var props = {
        resource: {totalResource: 5, freeResource: 2, bookedResource: {bookedResourceCount: 3, billed: 2, unbilled: 3}}
    }

    var component = mount(<OverdueProjects {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('OverdueProjects component', () => {
    describe('renderOverdueProject', () => {
        it('returns correct component', () => {
            var {component, props} = setup();
            var actual = component.instance().renderOverdueProject(0);
            var expected = <OverdueProjectRow key="0" overdueProject={props.overdueProjects[0]}/>;
            expect(actual).toEqual(expected);
        });

        it('renders all overdue projects', () => {
            var {component, props} = setup();
            var total = component.find(OverdueProjectRow).length;
            expect(total).toEqual(props.overdueProjects.length);
        });
    });
});*/
