(function() {
'use strict';

    var dir = 'views';
    angular
        .module('login', ['auth'])
        .config(routes)
        .controller('loginCtrl', loginCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: dir + '/login/login.html',
                controller: loginCtrl,
                controllerAs: '$ctrl',
                cache: false
            });
    }

    loginCtrl.inject = ['authService', '$state'];
    function loginCtrl(authService, $state) {
        var $ctrl = this;

        $ctrl.login = login;

        activate();

        ////////////////

        function activate() {
            $ctrl.error = null;
        }

        function goApp() {
            return $state.go('app');
        }

        function login(email, pass) {
            $ctrl.error = null;

            return authService.logIn(email, pass)
                    .then(goApp)
                    .catch(function(err) {
                        console.log('Err', err);
                        $ctrl.error = err.data.message
                    });
        }
    }
})();