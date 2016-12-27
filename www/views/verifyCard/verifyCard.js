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

    verifyCardCrtl.$inject = ['stateManager', 'Order'];
    function verifyCardCrtl(state, Order) {
        var $ctrl = this;

        $ctrl.verified = verified;

        activate();
        ////////////////

        function activate() {
            if (!Order.current) {
                return state.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
        }

        function goToSig() {
            state.go('app.signature');
        }

        function verified() {
            goToSig();
        }
    }
})();