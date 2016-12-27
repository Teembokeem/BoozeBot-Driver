(function() {
'use strict';

    var dir = 'views';
    angular
        .module('scanner', [])
        .config(routes)
        .controller('scannerCrtl', scannerCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.scanner', {
                url: '/scanner',
                templateUrl: dir + '/scanner/scanner.html',
                controller: scannerCrtl,
                controllerAs: '$ctrl'
            });
    }

    scannerCrtl.inject = ['$state', 'Order'];
    function scannerCrtl($state, Order) {
        var $ctrl = this;
        $ctrl.scan = scan;

        activate();

        ////////////////

        function activate() {
            $ctrl.currentOrder = Order.current;
        }

        function goToVerify() {
            $state.go('app.verifyCard');
        }

        function scan() {
            console.log('Scanning id...');
            setTimeout(function() {
                goToVerify();
            }, 1200);
        }
    }
})();