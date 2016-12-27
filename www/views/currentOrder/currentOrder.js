(function() {
'use strict';

    var dir = 'views';
    angular
        .module('currentOrder', ['scanner', 'verifyCard'])
        .config(routes)
        .controller('currentOrderCrtl', currentOrderCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.currentOrder', {
                url: '/currentOrder',
                templateUrl: dir + '/currentOrder/currentOrder.html',
                controller: currentOrderCrtl,
                controllerAs: '$ctrl'
            });
    }

    currentOrderCrtl.inject = ['$state', 'Order'];
    function currentOrderCrtl($state, Order) {
        var $ctrl = this;
        $ctrl.goToOrders = goToOrders;
        $ctrl.startScan = startScan;

        activate();

        ////////////////

        function activate() {
            $ctrl.currentOrder = Order.current;
        }

        function goToOrders() {
            $state.go('app.orders');
        }

        function startScan() {
            console.log('Scanning')
            $state.go('app.scanner');
        }
    }
})();