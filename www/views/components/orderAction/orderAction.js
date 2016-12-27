(function() {
'use strict';

    // Usage:
    //
    // Creates:
    //

    var dir = 'views/components';
    angular
        .module('orderAction', [])
        .component('orderAction', {
            templateUrl: dir + '/orderAction/orderAction.html',
            controller: orderActionCtrl,
            bindings: {
                order: '=',
            },
        });

    orderActionCtrl.inject = ['$ionicHistory'];
    function orderActionCtrl($ionicHistory) {
        var $ctrl = this;

        $ctrl.action = action;

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestory = function() { };

        function goBack() {
            $ionicHistory.goBack();
        }

        function action(method) {
            $ctrl.order[method]()
                goBack();

        }
    }
})();