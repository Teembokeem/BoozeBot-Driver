var _ctrl
(function() {
'use strict';

    // Usage:
    //
    // Creates:
    //
    var dir = 'views/components';
    angular
        .module('ordersList', [])
        .component('ordersList', {
            templateUrl: dir + '/ordersList/ordersList.html',
            controller: ordersListCtrl,
            bindings: {
                status: '@'
            },
        });

    ordersListCtrl.$inject = ['$scope', 'Order'];
    function ordersListCtrl($scope, Order) {
        var $ctrl = this;

        _ctrl= $ctrl;
        ////////////////

        $ctrl.$onInit = function() {
            $ctrl.sub = Order.subscribe(function() {
                setOrders(Order.get());
            });
            setOrders(Order.get());
        };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() {
            // Order.unsubscribe(setOrders);
        };

        function byStatus(order) {
            return order.status === $ctrl.status;
        }

        function setOrders(orders) {
            $ctrl.orders = orders.filter(byStatus);
            console.log($ctrl.orders)
            $scope.$applyAsync();
        }
    }
})();