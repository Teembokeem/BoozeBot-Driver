(function() {
    'use strict';

    angular.module('core', [
        'stateManager',
        'Configs',
        'ngFileUpload',
        'Services',
        'cache',
        'auth',
        'OrderApi',

    ])
        .constant('url', function() {
            // var base = 'http://localhost';
            // var base = 'http://192.168.0.4';
            var base = 'http://138.68.25.11';

            return {
                base: base,
                api: base + '/api/drivers'
            };
        // Immediatley invoke to alwauys return obj with scope
        }());
})();