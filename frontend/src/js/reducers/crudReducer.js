var Immutable = require('immutable');
var _ = require('lodash');

var initialState = Immutable.Map(
    {projectStatus: [{name: 'bihs', id: 1}]}
);

crudReducer = function (state, action) {

    state = state || initialState;
    switch (action.type) {
        case 'SAMPLE':
            var newState = state.set('projectStatus', action.data);
            console.log(state);
            return state.set('projectStatus', action.data);
        case 'DELETE':
            //var id = action.data;
            //var index = _.indexOf(state.get('projectStatus'), _.find(state.get('projectStatus'), {id: id}));
            //console.log('index' + index);
            //var newState = delete state.get('projectStatus')[index];
            // var newProjectStatus = state.get('projectStatus');
            //newProjectStatus.splice(index, 1);
            //console.log(newProjectStatus);
            //var abc = state.get('projectStatus').splice(index, 1);
            //var newState = state.withMutations(function (a) {
              //  state.get('projectStatus').splice(index, 1);
            //});
            //newState.get('projectStatus').splice(index, 1);
            //console.log(newState.get('projectStatus'));
            //var newState = state.set('projectStatus', newProjectStatus);
            //console.log(state.get('projectStatus'));
            return state.set('projectStatus', action.data);

        default:
            return state;
    }
}

module.exports = crudReducer;