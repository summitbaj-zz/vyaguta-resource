jest.dontMock('../../../src/js/components/project/Autocomplete')
    .dontMock('../../../src/js/components/project/TechnologyStack');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

/*
var dummyElement = document.createElement('input');
var arr = [];
arr.push(dummyElement);
*/
var AutoComplete = require('../../../src/js/components/project/Autocomplete');
/*document.getElementsByClassName = jasmine.createSpy('HTML Element').andReturn(arr);*/


var index = 0;
//selectedIndex = jasmine.createSpy('variable').andReturn(index);
var input;
var suggestions=['a','ab'];



describe('AutoComplete', function () {
    it('doesnot display suggestion box on focus out', function () {
        var abcd= TestUtils.renderIntoDocument(<input className="input-tag" onKeyDown={a.keyPressed} onBlur={a.focusOut}/>);
        var a = TestUtils.renderIntoDocument(<AutoComplete inputField="input-tag" suggestions={suggestions}/>);

        //a.keyPressed = jest.genMockFunction();
        /*a.componentDidMount();
        TestUtils.Simulate.keyDown(abcd, {keyCode : 65});

          expect(a.keyPressed).toBeCalled();*/
        a.focusOut();
        var b = a.getSelectedIndex();
        expect(b).toEqual(-1);
        expect(a.refs.suggestions.style.display).toEqual('none');
    });

    it('does not call arrowKeyPressed when suggestion is empty', function(){

        var ab = TestUtils.renderIntoDocument(<AutoComplete inputField="input-tag" suggestions={[]}/>);
        console.warn(ab.props.suggestions);
        var abcde = TestUtils.renderIntoDocument(<input className="input-tag" onKeyDown={ab.keyPressed} onBlur={ab.focusOut}/>);

        ab.arrowKeyPressed = jest.genMockFunction();
        TestUtils.Simulate.keyDown(abcde, {keyCode : 40});
        expect(ab.arrowKeyPressed).not.toBeCalled();
    });

    it('calls arrowKeyPressed when arrow is pressed', function(){
        var a = TestUtils.renderIntoDocument(<AutoComplete inputField="input-tag" suggestions={suggestions}/>);
        var abcd= TestUtils.renderIntoDocument(<input className="input-tag" onKeyDown={a.keyPressed} onBlur={a.focusOut}/>);
        a.arrowKeyPressed = jest.genMockFunction();
        TestUtils.Simulate.keyDown(abcd, {keyCode : 50});
        expect(a.arrowKeyPressed).not.toBeCalled();
        TestUtils.Simulate.keyDown(abcd, {keyCode : 40});
        expect(a.arrowKeyPressed).toBeCalled();
    });

    it('calls enterKeyPressed when enter is pressed', function(){
        var a = TestUtils.renderIntoDocument(<AutoComplete inputField="input-tag" suggestions={suggestions}/>);
        var abcd= TestUtils.renderIntoDocument(<input className="input-tag" onKeyDown={a.keyPressed} onBlur={a.focusOut}/>);
        a.enterKeyPressed = jest.genMockFunction();
        TestUtils.Simulate.keyDown(abcd, {keyCode : 13});
        expect(a.enterKeyPressed).toBeCalled();
    });

    it('decreases selectedIndex when up key is pressed', function(){
        var a = TestUtils.renderIntoDocument(<AutoComplete inputField="input-tag" suggestions={suggestions}/>);
        var abcd= TestUtils.renderIntoDocument(<input className="input-tag" onKeyDown={a.keyPressed} onBlur={a.focusOut}/>);

        console.warn(a.getSelectedIndex());
        a.setSelectedIndex(1);
        console.warn(a.getSelectedIndex());
        TestUtils.Simulate.keyDown(abcd, {keyCode : 38});
        expect(a.getSelectedIndex()).toEqual(0);
    });
});