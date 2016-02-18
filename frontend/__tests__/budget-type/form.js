jest.dontMock('../../src/js/components/budget-type/BudgetTypeForm')

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Form = require('../../src/js/components/budget-type/BudgetTypeForm');
var ApiUtil = require('../../src/js/api-util/ApiUtil');


var budgetType = {
    "name": "dfdsfsdf",
    "id": 13
}
var params = {
    budgetTypeId: 5
};


describe('Form', function () {
    it('does not call fetch function of ApiUtil when id is null', function () {
        var form = TestUtils.renderIntoDocument(<Form />)
        form.componentDidMount();
        expect(ApiUtil.fetchById).not.toBeCalled();
    });

    it('calls fetch function of ApiUtil when id is not null', function () {
        var form = TestUtils.renderIntoDocument(<Form params={params}/>)
        form.componentDidMount();
        expect(ApiUtil.fetchById).toBeCalled();
    });

    it('stores fetched data correctly into the state for edit', function () {
        var form = TestUtils.renderIntoDocument(<Form/>)
        form.changeState(budgetType);
        expect(form.state.budgetType.id).toNotEqual(null);
    });

    it('changes value of state on key press', function () {
        var value = 'b';
        var form = TestUtils.renderIntoDocument(<Form/>)
        form.fieldChange = jest.genMockFunction();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(form, 'input'));
        TestUtils.Simulate.change(input, {target: {name: 'name', value: value}})
        expect(form.state.budgetType.name).toEqual(value);

    });
    it('call edit function of ApiUtil when id is not null', function () {
        var form = TestUtils.renderIntoDocument(<Form params={params}/>)
        var statusForm = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(form, 'form'));
        TestUtils.Simulate.submit(statusForm);
        expect(ApiUtil.edit).toBeCalled();
    });
    it('call create function of ApiUtil when id is null', function () {
        var form = TestUtils.renderIntoDocument(<Form/>);
        var statusForm = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(form, 'form'));
        TestUtils.Simulate.submit(statusForm);
        expect(ApiUtil.create).toBeCalled();

    });
});
