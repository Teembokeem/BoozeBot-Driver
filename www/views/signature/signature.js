(function() {
'use strict';

    var dir = 'views';
    angular
        .module('signature', [])
        .config(routes)
        .controller('signatureCrtl', signatureCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.signature', {
                url: '/signature',
                templateUrl: dir + '/signature/signature.html',
                controller: signatureCrtl,
                controllerAs: '$ctrl'
            });
    }

    signatureCrtl.$inject = ['stateManager', 'Order'];
    function signatureCrtl(state, Order) {
        var $ctrl = this;

        $ctrl.complete = complete;

        activate();
        ////////////////

        function activate() {
            if (!Order.current) {
                return state.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
        }

        function goToComplete() {
            state.go('app.completedOrder');
        }

        function complete() {
            goToComplete();
        }
    }
})();