jest.dontMock('../../src/js/components/project-status/ProjectStatusForm')
    .dontMock('../../src/js/util/FormValidator');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Form = require('../../src/js/components/project-status/ProjectStatusForm');
var ApiUtil = require('../../src/js/util/ApiUtil');


var projectStatus = {
    "name": "dfdsfsdf",
    "id": 13
}
var params = {
    id: 5
};


describe('Form', function () {
    it('does not call fetch function of ApiUtil when id is null', function () {
        var form = TestUtils.renderIntoDocument(<Form params ={[]} />)
        form.componentDidMount();
        expect(ApiUtil.fetchById).not.toBeCalled();
    });

    it('calls fetch function of ApiUtil when id is not null', function () {
        var form = TestUtils.renderIntoDocument(<Form params={params}/>)
        form.componentDidMount();
        expect(ApiUtil.fetchById).toBeCalled();
    });

    it('stores fetched data correctly into the state for edit', function () {
        var form = TestUtils.renderIntoDocument(<Form params ={[]}/>)
        form.changeState(projectStatus);
        expect(form.state.projectStatus.id).toNotEqual(null);
    });

    it('changes value of state on key press', function () {
        var value = 'b';
        var form = TestUtils.renderIntoDocument(<Form params ={[]}/>)
        form.fieldChange = jest.genMockFunction();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(form, 'input'));
        TestUtils.Simulate.change(input, {target: {name: 'name', value: value}})
        expect(form.state.projectStatus.name).toEqual(value);

    });
    it('call edit function of ApiUtil when id is not null', function () {
        var form = TestUtils.renderIntoDocument(<Form params={params}/>)
        var statusForm = TestUtils.findRenderedDOMComponentWithTag(form, 'form');
        var formTitle = form.refs.name.getDOMNode();

        formTitle.value = 'test';
        TestUtils.Simulate.submit(statusForm);
        expect(ApiUtil.edit).toBeCalled();
    });

    it('call create function of ApiUtil when id is null', function () {
        var form = TestUtils.renderIntoDocument(<Form params = {[]}/>);
        var statusForm = TestUtils.findRenderedDOMComponentWithTag(form, 'form');
        var formTitle = form.refs.name.getDOMNode();

        formTitle.value = 'test';
        TestUtils.Simulate.submit(statusForm);
        expect(ApiUtil.create).toBeCalled();

    });
});
