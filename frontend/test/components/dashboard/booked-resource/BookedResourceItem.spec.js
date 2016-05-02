import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';

//components
import BookedResource from '../../../../src/js/components/dashboard/booked-resource/BookedResourceItem';

function setup(resource) {
    var props = {
        resource: resource,
        total: 4

    }

    var component = mount(<BookedResource {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('BookedResourceItem component', () => {
    describe('render', () => {
        it('does not show billed or unbilled information if not provided', () => {
            var {component} = setup({numberOfProjects: 2});
            var details = component.find('.stat-details');
            expect(details.length).toEqual(0);
        });

        it('shows billed or unbilled information if not provided', () => {
            var {component} = setup({billed: 2, unbilled: 2, numberOfProjects: 2});
            var details = component.find('.stat-details');
            expect(details.length).toEqual(1);
        });
    });

    describe('getClassName', () => {
        it('returns "fa fa-cogs" class name when project type is Services', () =>{
            var {component} = setup({});
            var className = component.instance().getClassName({projectType: 'Services'});
            expect(className).toEqual('fa fa-cogs');
        });
        it('returns "fa fa-cubes" class name when project type is Product', () =>{
            var {component} = setup({});
            var className = component.instance().getClassName({projectType: 'Product'});
            expect(className).toEqual('fa fa-cubes');
        });
        it('returns "icomoon icon-project" class name when project type is any other than Product and Services', () =>{
            var {component} = setup({});
            var className = component.instance().getClassName({projectType: 'asdf'});
            var className2 = component.instance().getClassName({projectType: 'Internal'});
            expect(className).toEqual('icomoon icon-project');
            expect(className2).toEqual('icomoon icon-project');
        });
    });
});