import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';

//components
import FreeResource from '../../../../src/js/components/dashboard/free-resource/FreeResource';
import FreeResourceItem from '../../../../src/js/components/dashboard/free-resource/FreeResourceItem';

function setup() {
    var props = {
        resource: [{
            firstName: 'Bishal', lastName: 'Shrestha',
            availableAllocation: 0.25,
            designation: 'Engineer'
        }, {
            firstName: 'Bishal', lastName: 'Shrestha',
            availableAllocation: 0.25,
            designation: 'Engineer'
        }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }

    var component = mount(<FreeResource {...props}/>);
    return {
        component: component,
        props: props
    }
}

describe('FreeResource component', () => {
    describe('showFreeResource', () => {
        it('calls renderCarousal', () => {
            var {component} = setup();
            var spy = expect.spyOn(component.instance(), 'renderCarousal');
            component.instance().showFreeResource();
            expect(spy).toHaveBeenCalled();
        });

        it('returns correct html tags', () => {
            var {component} = setup();
            expect.spyOn(component.instance(), 'renderCarousal').andReturn(<div>{'nothing'}</div>);
            var carousalArray = component.instance().showFreeResource();
            var expected = <div className="carousel-inner" role="listbox">{[<div>{'nothing'}</div>,
                <div>{'nothing'}</div>]}</div>
            expect(carousalArray).toEqual(expected);
        });
    });

    describe('renderCarousal', () => {
        it('calls renderResource', () => {
            var {component} = setup();
            var spy = expect.spyOn(component.instance(), 'renderResource');
            component.instance().renderCarousal(0);
            expect(spy).toHaveBeenCalled();
        });

        it('returns correct html tags', () => {
            var {component} = setup();
            expect.spyOn(component.instance(), 'renderResource').andReturn(<div></div>);
            var output = component.instance().renderCarousal(0);
            var expected = <div className={'item active'} key={'resource0'}>{[<div></div>, <div></div>, <div></div>,
                <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>,
                <div></div>, <div></div>, <div></div>, <div></div>, <div></div>]}</div>
            expect(output).toEqual(expected);
        });

        it('returns div with className "item" only if i is not zero', () => {
            var {component} = setup();
            expect.spyOn(component.instance(), 'renderResource').andReturn(<div></div>);
            var output = component.instance().renderCarousal(1);
            var expected = <div className={'item'} key={'resource1'}>{[<div></div>]}</div>
            expect(output).toEqual(expected);
        });
    });

    describe('renderResource', () => {
        it('rendersFreeResource properly', () => {
            var {component, props} = setup();
            var output = component.instance().renderResource(0);
            var expected = <FreeResourceItem key={0} resource={props.resource[0]}/>
            expect(output).toEqual(expected);
        });

        it('renders all free resource', () => {
            var {component, props} = setup();
            var total = component.find(FreeResourceItem).length;
            expect(total).toEqual(props.resource.length);
        });
    });

    describe('renderCarouselIndicator', () => {
        it('returns correct number of indicators', () => {
            var {component, props} = setup();
            var output = component.instance().renderCarouselIndicator();
            var expected = (
                <ol className="carousel-indicators">
                    {[<li data-target="#myCarousel" data-slide-to={0}
                          className="active" key="indicator0"></li>,
                        <li data-target="#myCarousel" data-slide-to={1}
                            className="" key="indicator1"></li>
                    ]}
                </ol>);
            expect(output).toEqual(expected);
        });
    });
});