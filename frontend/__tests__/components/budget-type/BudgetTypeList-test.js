/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */


jest.dontMock('../../../src/js/components/budget-type/BudgetTypeList')
    .dontMock('lodash')
    .dontMock('../../../src/js/store/store')
    .dontMock('../../../src/js/reducers/crudReducer');

var React = require('react');
var TestUtils = require('react-addons-test-utils');

var BudgetTypeList = require('../../../src/js/components/budget-type/BudgetTypeList').WrappedComponent;
var BudgetTypeRow = require('../../../src/js/components/budget-type/BudgetTypeRow');
var ApiUtil = require('../../../src/js/util/apiUtil');
var store = require('../../../src/js/store/store');
var crudActions = require('../../../src/js/actions/crudActions');

var List; //testBudgetTypeList

var budgetTypes = [
    {
        name: 'asdf',
        id: 1
    },
    {
        name: 'asdfasd',
        id: 2
    }
];

describe('BudgetTypeList', function () {
    beforeEach(function () {
        List = TestUtils.renderIntoDocument(<BudgetTypeList budgetTypes={budgetTypes}/>);
    });

    it('calls getAll method of crudAction on component mount', function(){
        List.componentDidMount();
        expect(crudActions.fetchAll).toBeCalled();
    });

    it('renders one BudgetType Row with correct props', function () {
        var key = 1;
        var actual = <BudgetTypeRow key={key} index={key} budgetType={List.props.budgetTypes[key]} deleteBudgetType={List.deleteBudgetType}/>
        var expected = List.renderBudgetType(key);
        expect(expected).toEqual(actual);
    });

    it('doesnot delete when confirmation is cancelled', function () {
        spyOn(window, 'confirm').andReturn(false);
        List.deleteBudgetType(1);
        expect(crudActions.deleteItem).not.toBeCalled();
    })

    it('deletes when confirmation is accepted', function () {
        spyOn(window, 'confirm').andReturn(true);
        List.deleteBudgetType(1);
        expect(crudActions.deleteItem).toBeCalled();
    })



});
