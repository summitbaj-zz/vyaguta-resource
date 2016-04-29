import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';

//components
import InProgressProjects from '../../../../src/js/components/dashboard/ongoing-projects/InProgressProjects';
import InProgressProjectRow from '../../../../src/js/components/dashboard/ongoing-projects/InProgressProjectRow';

function setup() {
    var props = {
        projects: [{foo: 'bar', id: 1}, {foo: 'bar2', id: 2}]
    }

    var component = mount(<InProgressProjects {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('InProgressProjects component', () => {
    describe('InProgressProjects component', () => {
        describe('renderProject', () => {
            it('returns correct component', () => {
                var {component, props} = setup();
                var actual = component.instance().renderProject(0);
                var expected = <InProgressProjectRow key="0" index={1} project={props.projects[0]}/>;
                expect(actual).toEqual(expected);
            });

            it('renders all ending projects', () => {
                var {component, props} = setup();
                var total = component.find(InProgressProjectRow).length;
                expect(total).toEqual(props.projects.length);
            });
        });
    });
});