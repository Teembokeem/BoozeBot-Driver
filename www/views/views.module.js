(function () {
    'use strict';

    angular.module('views', [
        'login',
        'orders',
        'orderDetails',
        'currentOrder'
        // 'account',
        // 'camera',
        // 'chat',
        // 'dash'
    ])
        .config(routes)
        .controller('menuCtrl', menuCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = 'views'
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: dir + '/sidemenu.html',
                controller: menuCtrl,
                controllerAs: '$ctrl'
            });
    }

    function menuCtrl() {
        var $ctrl = this;

        $ctrl.logout = logout;

        function logout() {
            console.log('Logging out...');
        }
    }
})();