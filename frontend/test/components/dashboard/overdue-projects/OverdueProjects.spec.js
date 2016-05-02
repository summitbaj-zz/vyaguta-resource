import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import OverdueProjects from '../../../../src/js/components/dashboard/overdue-projects/OverdueProjects';
import OverdueProjectRow from '../../../../src/js/components/dashboard/overdue-projects/OverdueProjectRow';

function setup() {
    var props = {
        overdueProjects: [{foo: 'bar', id: 1}, {foo: 'bar2', id: 2}]
    }

    var component = mount(<OverdueProjects {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('OverdueProjects component', () => {
    describe('renderProject', () => {
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
});