/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/18/16.
 */

jest.dontMock('../../src/js/components/budget-type/BudgetTypeList');

var React = require('react');
var TestUtils = require('react-addons-test-utils');

var BudgetTypeList = require('../../src/js/components/budget-type/BudgetTypeList');
var BudgetTypeRow = require('../../src/js/components/budget-type/BudgetTypeRow');
var ApiUtil = require('../../src/js/util/ApiUtil');

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
        List = TestUtils.renderIntoDocument(<BudgetTypeList />);
    });

    it('updates the store correctly with the fetched data', function () {
        List.updateState(budgetTypes);
        expect(List.state.budgetTypes).toEqual(budgetTypes);
    });

    it('successfully deletes the data from state', function () {
        var id = 1;
        List.updateState(budgetTypes);
        List.removeFromState(id);
        expect(List.state.budgetTypes.length).toEqual(1);
    });

    it('calls the fetchAll method of ApiUtil when component is mounted', function () {
        List.componentDidMount();
        expect(ApiUtil.fetchAll).toBeCalled();
    });

    it('renders one BudgetType Row with correct props', function () {
        var key = 1;
        var actual = <BudgetTypeRow key={key} index={key} budgetType={List.state.budgetTypes[key]} deleteBudgetType={List.deleteBudgetType}/>
        var expected = List.renderBudgetType(key);
        expect(expected).toEqual(actual);
    });

    it('doesnot delete when confirmation is cancelled', function () {
        var id = 1;
        spyOn(window, 'confirm').andReturn(false);
        List.deleteBudgetType(1);
        expect(ApiUtil.delete).not.toBeCalled();
    })

    it('deletes when confirmation is accepted', function () {
        var id = 1;
        spyOn(window, 'confirm').andReturn(true);
        List.deleteBudgetType(1);
        expect(ApiUtil.delete).toBeCalled();
    })

})


