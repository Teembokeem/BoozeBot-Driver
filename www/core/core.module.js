(function() {
    'use strict';

    angular.module('core', [
        'stateManager',
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