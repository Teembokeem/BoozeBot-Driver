(function() {
'use strict';

    // Usage:
    //
    // Creates:
    //

    var dir = 'views/components';
    angular
        .module('deliveryFail', [])
        .component('deliveryFail', {
            templateUrl: dir + '/deliveryFail/deliveryFail.html',
            controller: deliveryFailCtrl,
            bindings: {
                toggle: '=',
                order: '='
            },
        });

    deliveryFailCtrl.$inject = ['stateManager', '$ionicHistory'];
    function deliveryFailCtrl(state, $ionicHistory) {
        var $ctrl = this;

        $ctrl.action = action;

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestory = function() { };

        function goBack() {
            $ionicHistory.goBack();
        }

        function action(method, attempt) {
            $ctrl.order[method](attempt ? attempt : '')

            if (method == 'start') {
                return state.goNoBack('app.currentOrder');
            }
            if (method == 'cancel') {
                return state.goNoBack('app.orders');
            }
            
            return goBack();
        }
    }
})();