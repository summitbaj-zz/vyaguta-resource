/*

 var spy = expect.spyOn(EndingProjects.prototype, 'getEndingProjectsData');
describe('calculateTotalResource', () => {
    it('returns correct total number of projects', () => {
        var {component} = setup();
        var totalResources = component.instance().calculateTotalResource();
        expect(totalResources).toEqual(4);
    });
});

 describe('calculate percentage', () => {
 it('gives correct percentage', () => {
 var {component} = setup({});
 var percentage = component.instance().calculatePercentage(2, 4);
 expect(percentage).toEqual('50%');
 });
 it('rounds off result to two digit places', () => {
 var {component} = setup({});
 var percentage = component.instance().calculatePercentage(2, 3);
 expect(percentage).toEqual('66.67%');
 });
 it('returns 0 if there is a case of NaN output', () => {
 var {component} = setup({});
 var percentage = component.instance().calculatePercentage(0, 0);
 expect(percentage).toEqual('0%');
 });
 });

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

 var addDayInDate = function (value) {
 var today = new Date();
 var newDate = new Date();
 newDate.setDate(today.getDate() + value);
 return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
 }

 describe('addDayInDate', () => {
 it('returns correctly added date', () => {
 var {component, addDayInDate} = setup();
 var instance = component.instance();
 expect(instance.addDayInDate(1)).toEqual(addDayInDate(1));
 });
 });
*/
