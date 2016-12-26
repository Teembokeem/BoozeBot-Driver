(function() {
'use strict';

    angular
        .module('dash', [])
        .config(routes)
        .controller('dashCtrl', dashCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'views/dash/dash.html',
                        controller: 'dashCtrl'
                    }
                }
            });
    }

    dashCtrl.$inject = [];
    function dashCtrl() {
        var vm = this;


        activate();

        ////////////////

        function activate() { }
    }
})();