(function () {
    'use strict';

    angular.module('views', [
        'login'
        // 'account',
        // 'camera',
        // 'chat',
        // 'dash'
    ])
        .config(routes);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = 'views'
        $stateProvider
            .state('app', {
                url: '/app',
                // abstract: true,
                // templateUrl: dir + '/tabs.html'
                templateUrl: dir + '/sidemenu.html'
            });
    }
})();