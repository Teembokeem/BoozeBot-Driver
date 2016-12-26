(function () {
    'use strict';

    angular.module('views', [
        'account',
        'camera',
        'chat',
        'dash'
    ])
        .config(routes);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = 'views/'
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: dir + '/tabs.html'
            });
    }
})();