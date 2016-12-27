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
                api: base + '/api/drivers'
            };
        // Immediatley invoke to alwauys return obj with scope
        }());
})();