var _sig;
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
        var sigpad;

        $ctrl.complete = complete;

        activate();
        ////////////////

        function activate() {
            if (!Order.current) {
                return state.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
            $ctrl.currentOrder.totalQty = $ctrl.currentOrder.qty.reduce(function(a, b) {
                return a + b
            }, 0);
            angular.element(document).ready(function () {
                var canvas = document.querySelector('canvas');
                sigpad = new SignaturePad(canvas);
                _sig = sigpad;
                console.log("sigpads", sigpad)
            });
        }

        function goToComplete() {
            state.go('app.completedOrder');
        }

        function complete() {
                console.log('CONFIRMED!', sigpad.toDataURL());
                var canvas = document.querySelector('canvas');
                sigpad = new SignaturePad(canvas);
            goToComplete();
        }
    }
})();
