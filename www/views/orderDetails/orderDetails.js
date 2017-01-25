(function() {
'use strict';

    var dir = 'views';
    angular
        .module('orderDetails', ['orderAction'])
        .config(routes)
        .controller('orderDetailsCtrl', orderDetailsCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.orderDetails', {
                url: '/orderDetails/:id',
                templateUrl: dir + '/orderDetails/orderDetails.html',
                controller: orderDetailsCtrl,
                controllerAs: '$ctrl'
            });
    }

    orderDetailsCtrl.$inject = ['$state', '$stateParams', 'Order', 'stateManager', '$ionicHistory'];
    function orderDetailsCtrl($state, $stateParams, Order, state, $ionicHistory) {
        var $ctrl = this

        $ctrl.action = action;

        activate();

        ////////////////

        function activate() {
            console.log('Activated', $stateParams.id, $ctrl);

            $ctrl.order = Order.findById($stateParams.id)//(function(order) { return order._id === $stateParams.id})[0];

        }

        function goBack() {
            $ionicHistory.goBack();
        }

        function action(method) {
            $ctrl.order[method]()

            if (method == 'start') {
                return state.goNoBack('app.currentOrder');
            }
            return goBack();
        }
    }
})();