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

    ordersCtrl.$inject = ['$state'];
    function ordersCtrl($state) {
        var $ctrl = this
        $ctrl.toggleView = toggleView;

        activate();

        ////////////////

        function activate() {
            toggleView();
        }

        function toggleView(view) {
            $ctrl.view = view;
        }

    }
})();