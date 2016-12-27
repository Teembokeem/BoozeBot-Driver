(function() {
    'use strict';

    angular.module('core', [
        'cache',
        'auth',
        'OrderApi'

    ])
        .constant('url', function() {
            var base = 'http://localhost:3000';

            return {
                base: base,
                api: base + '/api'
            };
        });
})();