(function() {
'use strict';

    // Usage:
    //
    // Creates:
    //
    var dir = 'views/components';
    angular
        .module('settingsField', [])
        .component('settingsField', {
            templateUrl: dir + '/settingsField/settingsField.html',
            controller: settingsFieldCtrl,
            controllerAs: '$ctrl',
            bindings: {
                name: '@',
                model: '='
            },
        });

    settingsFieldCtrl.$inject = ['authService'];
    function settingsFieldCtrl(authService) {
        var $ctrl = this;

        ////////////////

        $ctrl.$onInit = function() {};
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() {};
    }
})();