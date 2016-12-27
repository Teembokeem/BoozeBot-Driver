(function () {
    'use strict';

    angular
        .module('stateManager', [])
        .factory('stateManager', stateManager);

    stateManager.inject = ['$state', '$ionicHistory'];
    function stateManager($state, $ionicHistory) {
        var service = {
            go: go,
            goNoBack: goNoBack
        };

        return service;

        ////////////////
        function go(state, params, opts) {
            return $state.go(state, params || {}, opts || {});
        }

        function goNoBack(state, params, opts) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            return go(state, params, opts);
        }
    }
})();