(function() {
'use strict';

    var dir = 'views';
    angular
        .module('orders', ['ordersList'])
        .config(routes)
        .controller('ordersCtrl', ordersCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        console.log('asdfasdfasdf');

        $stateProvider
            .state('app.orders', {
                url: '/orders',
                templateUrl: dir + '/orders/orders.html',
                controller: ordersCtrl,
                controllerAs: '$ctrl'
            });
    }

    ordersCtrl.inject = ['$state'];
    function ordersCtrl($state) {
        var $ctrl = this
        $ctrl.view = 'Accepted';
        $ctrl.switchView = 'Assigned';
        $ctrl.goToCurrent = goToCurrent;
        $ctrl.toggleView = toggleView;

        activate();

        ////////////////

        function activate() {
            console.log('Activated');
            toggleView();

        }

        function toggleView() {
            var cur = $ctrl.view,
                other = $ctrl.switchView;
            $ctrl.view = other;
            $ctrl.switchView = cur;
        }

        function goToCurrent() {
            $state.go('app.currentOrder');
        }
    }
})();