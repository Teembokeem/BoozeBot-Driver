(function() {
'use strict';

    angular
        .module('account', [])
        .config(routes)
        .controller('accountCtrl', accountCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = 'views/account';
        $stateProvider
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: dir + '/account.html',
                        controller: 'accountCtrl',
                        controllerAs: '$ctrl'
                    }
                }
            });
    }

    accountCtrl.$inject = [];
    function accountCtrl() {
        var vm = this;
        vm.settings = {
            enableFriends: true
        }


        activate();

        ////////////////

        function activate() {
        }
    }
})();