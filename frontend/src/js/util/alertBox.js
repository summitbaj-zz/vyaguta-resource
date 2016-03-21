/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/20/16.
 */


var alertBox = {
    confirm: function(message, callBack) {
        $.confirm({
            title: 'Confirm!',
            icon: 'fa fa-warning',
            content: message,
            animation: 'zoom',
            animationSpeed: 200,
            confirmButtonClass: 'btn-success',
            cancelButtonClass: 'btn-danger',
            confirmButton: 'Yes',

            confirm: function () {
                callBack();
            }
        });
    }
};

module.exports = alertBox;