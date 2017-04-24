var _view;
(function() {
'use strict';

    var dir = 'views';
    angular
        .module('orders', ['ordersList'])
        .config(routes)
        .controller('ordersCtrl', ordersCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.orders', {
                url: '/orders',
                templateUrl: dir + '/orders/orders.html',
                controller: ordersCtrl,
                controllerAs: '$ctrl'
            });
    }

    ordersCtrl.$inject = ['$state', 'Order', '$scope', '$timeout'];
    function ordersCtrl($state, Order, $scope, $timeout) {
        var $ctrl = this
        $ctrl.toggleView = toggleView;
        $ctrl.doRefresh = doRefresh

        activate();

        ////////////////

        function activate() {
            toggleView();
            
        }

        function toggleView(view) {
            $ctrl.view = view;
        }

        function doRefresh() {
            $scope.$broadcast('pull refresh');   
        }

        $scope.$on( 'refresh done', function(res) {
            $scope.$broadcast('scroll.refreshComplete');
        })

        function setOrders(orders) {
            $ctrl.orders = orders.filter(byStatus);
            console.log('all orders', orders)
            console.log($ctrl.orders)
            $scope.$applyAsync();
        }



    }
})();