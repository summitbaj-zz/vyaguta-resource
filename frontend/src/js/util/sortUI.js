;(function () {
    'use strict';

    function sortUI() {
        this.changeSortDisplay = function (field) {
            var sortField = $('#' + field);
            var sortIcon = sortField.children('i');
            var sortType = sortField.attr('data-sort');

            $('.fa-sort-asc').attr('class', 'fa fa-sort pull-right');
            $('.fa-sort-desc').attr('class', 'fa fa-sort pull-right');
            $('.sort').attr('data-sort', 'none');

            if (sortType == 'none' || sortType == 'desc') {
                sortField.attr('data-sort', 'asc');
                $(sortIcon).attr('class', 'fa fa-sort-asc pull-right');
                return true;
            } else if (sortType == 'asc') {
                sortField.attr('data-sort', 'desc');
                $(sortIcon).attr('class', 'fa fa-sort-desc pull-right');
                return false;
            }
        }
    }

    module.exports = new sortUI();

})();