;(function () {
    'use strict';

    function sortUI() {
        this.changeSortDisplay = function (event) {
            var sortType = $(event.target).attr('data-sort');
            $('.fa-sort-asc').attr('class', 'fa fa-sort cursor-pointer pull-right');
            $('.fa-sort-asc').attr('data-sort', 'none');

            $('.fa-sort-desc').attr('class', 'fa fa-sort cursor-pointer pull-right');
            $('.fa-sort-asc').attr('data-sort', 'none');

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