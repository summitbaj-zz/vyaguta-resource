import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';
import _ from 'lodash';

//components
import EndingProjects from '../../../../src/js/components/dashboard/ending-projects/EndingProjects';
import EndingProjectsRow from '../../../../src/js/components/dashboard/ending-projects/EndingProjectRow';

var spy = expect.spyOn(EndingProjects.prototype, 'getEndingProjectsData');
function setup() {
    var props = {
        endingProjects: [{contracts: [], foo: 'bar', numberOfProjects: 2}, {contracts: [], foo: 'bar2', numberOfProjects: 2}]
    }

    var component = mount(<EndingProjects {...props}/>);
    return {
        component: component,
        props: props,
    }
}

describe('EndingProjects component', () => {
    describe('isEnding', () => {
        it('returns true if date is below 15 days from now', () => {
            var {component, props} = setup();
            var date = new Date();
            date.setDate(date.getDate() + 6);
            var isEnding = component.instance().isEnding(date);
            expect(isEnding).toBeTruthy();
        });

        it('returns false if date is above 15 days from now', () => {
            var {component, props} = setup();
            var date = new Date();
            date.setDate(date.getDate() + 18);
            var isEnding = component.instance().isEnding(date);
            expect(isEnding).toBeFalsy();
        });

        it('returns false if date is past today', () => {
            var {component, props} = setup();
            var date = new Date();
            date.setDate(date.getDate() - 1);
            var isEnding = component.instance().isEnding(date);
            expect(isEnding).toBeFalsy();
        });
    });
   });