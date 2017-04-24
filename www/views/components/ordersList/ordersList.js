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

    ordersListCtrl.$inject = ['$scope', 'Order', '$state'];
    function ordersListCtrl($scope, Order, $state) {
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

        $scope.$on('pull refresh', function(event, mass) { 
             setOrders(Order.get());
        });

        function byStatus(order) {
            return order.status === $ctrl.status;
        }

        function setOrders(orders) {
            $ctrl.orders = orders.filter(byStatus);
            console.log('all orders', orders)
            console.log($ctrl.orders)
            $scope.$emit('refresh done');
            $scope.$applyAsync();
            
        }

        $ctrl.moveView = function(order) {
            if (order.status === 'In Progress') {
                $state.go('app.currentOrder', {id: order._id})
            } else {
                $state.go('app.orderDetails', {id: order._id})
            }
        }
    }
})();