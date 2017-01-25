(function () {
    'use strict';

    var dir = 'views';
    angular
        .module('completedOrder', [])
        .config(routes)
        .controller('completedOrderCrtl', completedOrderCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.completedOrder', {
                url: '/completedOrder',
                templateUrl: dir + '/completedOrder/completedOrder.html',
                controller: completedOrderCrtl,
                controllerAs: '$ctrl',
                cache: false
            });
    }

    completedOrderCrtl.$inject = ['stateManager', 'Order', '$ionicHistory'];
    function completedOrderCrtl(state, Order, $ionicHistory) {
        var $ctrl = this;
        $ctrl.backToOrders = backToOrders;

        activate();

        ////////////////

        function activate() {
            if (!Order.current) {
                return state.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
        }

        function backToOrders() {
            Order.complete();
            $ionicHistory.clearCache();
            state.goNoBack('app.orders');
        }
    }
})();