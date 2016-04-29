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
        it('renders properly', () => {
            var {component} = setup();
            console.log(component.find('.list-group-item').html());
        });
    });
});