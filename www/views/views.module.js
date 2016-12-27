(function () {
    'use strict';

    angular.module('views', [
        'core',
        'login',
        'orders',
        'orderDetails',
        'currentOrder',
        'settings'
        // 'account',
        // 'camera',
        // 'chat',
        // 'dash'
    ])
        .config(routes)
        .controller('menuCtrl', menuCtrl);

    routes.$inject = ['$stateProvider', ];
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

    menuCtrl.$inject = ['stateManager', 'authService'];
    function menuCtrl(state, authService) {
        var $ctrl = this;

        $ctrl.logout = logout;

        function goToLogin() {
            return state.go('login');
        }

        function logout() {
            console.log('Logging out...');
            authService.logOut()
                .then(goToLogin);
        }
    }
})();