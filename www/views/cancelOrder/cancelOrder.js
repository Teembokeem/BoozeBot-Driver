(function() {
'use strict';

    var dir = 'views';
    angular
        .module('cancelOrder', [])
        .config(routes)
        .controller('cancelOrderCrtl', cancelOrderCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.cancelOrder', {
                url: '/cancelOrder',
                templateUrl: dir + '/cancelOrder/cancelOrder.html',
                controller: cancelOrderCrtl,
                controllerAs: '$ctrl',
                cache: false
            });
    }

    cancelOrderCrtl.$inject = ['stateManager', 'Order'];
    function cancelOrderCrtl(stateManager, Order) {
        var $ctrl = this;
        $ctrl.cancel = cancel;

        activate();

        ////////////////

        function activate() {
            if (!Order.current) {
                return stateManager.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
        }

        function goToOrders() {
            stateManager.goNoBack('app.orders');
        }

        function cancel() {
            $ctrl.currentOrder.cancel();
             goToOrders();
        }
    }
})();