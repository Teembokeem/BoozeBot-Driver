(function() {
'use strict';

    var dir = 'views';
    angular
        .module('verifyCard', [])
        .config(routes)
        .controller('verifyCardCrtl', verifyCardCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.verifyCard', {
                url: '/verifyCard',
                templateUrl: dir + '/verifyCard/verifyCard.html',
                controller: verifyCardCrtl,
                controllerAs: '$ctrl'
            });
    }

    verifyCardCrtl.inject = ['$state', 'Order'];
    function verifyCardCrtl($state, Order) {
        var $ctrl = this;

        activate();

        ////////////////

        function activate() {
            $ctrl.currentOrder = Order.current;
        }
    }
})();