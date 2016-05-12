;(function () {
    'use-strict';

    var converter = {
        serialize: function (data) {
            if (typeof(data) != 'object') {
                return '?' + data;
            }
            var str = [];
            for (var p in data) {
                if(data[p] instanceof Array){
                    data[p].forEach(function (entry) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(entry));
                    });
                }
                else if (data[p] && data.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
                }
            }
            return '?' + str.join('&');
        },

        getPathParam: function () {
            var args = arguments;
            var params = [];

            for (var a in args) {
                params.push(args[a]);
            }
            return params.join('/');
        }
    }

    module.exports = converter;

})();