;(function () {
    'use strict';

    function sortUI() {
        this.changeSortDisplay = function(event){
            var sortType = $(event.target).attr('data-sort');

        if (sortType == 'none' || sortType == 'desc') {
            $(event.target).attr('data-sort', 'asc');
            $(event.target).attr('class', 'fa fa-sort-asc cursor-pointer pull-right');
            return true;
        } else if (sortType == 'asc') {
            $(event.target).attr('data-sort', 'desc');
            $(event.target).attr('class', 'fa fa-sort-desc cursor-pointer pull-right');
            return false;
        }
    }
    }

    module.exports = new sortUI();

})();