(function() {
'use strict';

    var dir = 'views';
    angular
        .module('orderDetails', ['orderAction'])
        .config(routes)
        .controller('orderDetailsCtrl', orderDetailsCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        console.log('asdfasdfasdf');

        $stateProvider
            .state('app.orderDetails', {
                url: '/orderDetails/:id',
                templateUrl: dir + '/orderDetails/orderDetails.html',
                controller: orderDetailsCtrl,
                controllerAs: '$ctrl'
            });
    }

    orderDetailsCtrl.$inject = ['$state', '$stateParams', 'Order'];
    function orderDetailsCtrl($state, $stateParams, Order) {
        var $ctrl = this

        $ctrl.accept = accept;

        activate();

        ////////////////

        function activate() {
            console.log('Activated', $stateParams.id, $ctrl);

            $ctrl.order = Order.findById($stateParams.id)//(function(order) { return order._id === $stateParams.id})[0];

        }

        function accept() {
            console.log('Accepting!', $ctrl.order);
        }

        function start() {
            console.log('Starting!', $ctrl.order);
        }
    }
})();