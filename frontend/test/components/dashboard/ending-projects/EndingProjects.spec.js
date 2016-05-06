import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';
import _ from 'lodash';

//components
import EndingProjects from '../../../../src/js/components/dashboard/ending-projects/EndingProjects';
import EndingProjectRow from '../../../../src/js/components/dashboard/ending-projects/EndingProjectRow';
import dashboardUtil from '../../../../src/js/services/dashboardService';

var fakeEndingProjects = [
    {
        id: 1,
        project: 'fake',
        endDate: 'today',
        resources: '2'
    },

    {
        id: 2,
        project: 'fake',
        endDate: 'today',
        resources: '2'
    }
];
dashboardUtil.getEndingProjectsData = expect.createSpy().andReturn(fakeEndingProjects);
dashboardUtil.getEndingProjectsResourceTotal = expect.createSpy();

function setup() {
    var props = {
        endingProjects: [{foo: 'bar', id: 1}, {foo: 'bar2', id: 2}]
    }

    var component = mount(<EndingProjects {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('EndingProjects component', () => {
    describe('renderEndingProject', () => {
        it('returns correct component', () => {
            var {component, props} = setup();
            var actual = component.instance().renderEndingProject(props.endingProjects[0]);
            var expected = <EndingProjectRow key="1" endingProject={props.endingProjects[0]}/>;
            expect(actual).toEqual(expected);
        });

        it('renders all ending projects', () => {
            var {component, props} = setup();
            var total = component.find(EndingProjectRow).length;
            expect(total).toEqual(props.endingProjects.length);
        });
    });
});
describe('render', () => {
    it('calls getEndingProjectsData of dashboardUtil', () => {
        var {props} = setup();
        expect(dashboardUtil.getEndingProjectsData).toHaveBeenCalledWith(props.endingProjects);
    });

    it('calls getEndingProjectsResourceTotal of dashboardUtil', () => {
        var {props} = setup();
        expect(dashboardUtil.getEndingProjectsResourceTotal).toHaveBeenCalledWith(fakeEndingProjects);
    });

    it('returns no record found item if there are no records', () => {
        dashboardUtil.getEndingProjectsData = expect.createSpy().andReturn([]);
        var component = mount(<EndingProjects endingProjects={[]}/>);
        var output = component.find('.not-found-message');
        expect(output.length).toEqual(1);
    });
});