/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/6/16.
 */


;(function() {

    var formUtil = {
        disableForm: function(elementId) {
            $('#'+ elementId).on('keyup keypress', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                    e.preventDefault();
                    return false;
                }
            });
        }
    }

    module.exports = formUtil;
})();