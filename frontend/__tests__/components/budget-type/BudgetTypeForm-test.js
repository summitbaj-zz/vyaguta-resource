/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */
/*
jest.dontMock('../../../src/js/components/budget-type/BudgetTypeForm');
jest.dontMock('../../../src/js/util/FormValidator');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var BudgetTypeForm = require('../../../src/js/components/budget-type/BudgetTypeForm');
var ApiUtil = require('../../../src/js/util/ApiUtil');

var budgetType = [
    {
        "title": "asdf",
        "id": 1
    }
];

var paramWithId = {
    "id": 1
};

var paramWithoutId = {};

var Form; //test BudgetTypeForm

describe('BudgetTypeForm', function () {
    it('does not call fetchById of ApiUtil when id is  null', function () {
        Form = TestUtils.renderIntoDocument(<BudgetTypeForm params={paramWithoutId}/>);
        Form.componentDidMount();
        expect(ApiUtil.fetchById).not.toBeCalled();
    });

    it('calls fetchById of ApiUtil when id is not null', function () {
        Form = TestUtils.renderIntoDocument(<BudgetTypeForm params={paramWithId}/>);
        Form.componentDidMount();
        expect(ApiUtil.fetchById).toBeCalled();
    });

    it('stores fetched data correctly into state for Edit', function () {
        Form = TestUtils.renderIntoDocument(<BudgetTypeForm  params={paramWithId}/>);
        Form.updateState(budgetType);
        expect(Form.state.budgetType).toEqual(budgetType);
    });

    it('calls edit function of ApiUtil when id is present and submit is pressed with valid data', function() {
        Form = TestUtils.renderIntoDocument(<BudgetTypeForm params={paramWithId}/>);
        var budgetTypeForm = TestUtils.findRenderedDOMComponentWithTag(Form, 'form');
        var formTitle = Form.refs.budgetType.getDOMNode();

        formTitle.value = 'test';
        TestUtils.Simulate.submit(budgetTypeForm);

        expect(ApiUtil.edit).toBeCalled();
    });

    it('calls create function of ApiUtil when id is not present and submit is pressed with valid data', function() {
        Form = TestUtils.renderIntoDocument(<BudgetTypeForm params={paramWithoutId}/>);
        var budgetTypeForm = TestUtils.findRenderedDOMComponentWithTag(Form, 'form');
        var formTitle = Form.refs.budgetType.getDOMNode();

        formTitle.value = 'test';
        TestUtils.Simulate.submit(budgetTypeForm);

        expect(ApiUtil.create).toBeCalled();
    });

    it('changes value of state on key press', function () {
        var value = 'b';
        var Form = TestUtils.renderIntoDocument(<BudgetTypeForm params={paramWithoutId}/>)
        Form.handlechange = jest.genMockFunction();
        var input = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(Form, 'input'));
        TestUtils.Simulate.change(input, {target: {name: 'name', value: value}})
        expect(Form.state.budgetType.name).toEqual(value);
    });
});*/
