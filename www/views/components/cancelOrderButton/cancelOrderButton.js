(function() {
'use strict';

    // Usage:
    //
    // Creates:
    //

    var dir = 'views/components';
    angular
        .module('cancelOrderButton', [])
        .component('cancelOrderButton', {
            templateUrl: dir + '/cancelOrderButton/cancelOrderButton.html',
            controller: cancelOrderButtonCtrl,
            bindings: {
            },
        });

    cancelOrderButtonCtrl.$inject = [];
    function cancelOrderButtonCtrl() {
        var $ctrl = this;


        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestory = function() { };

    }
})();