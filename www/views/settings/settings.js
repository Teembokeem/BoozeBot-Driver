(function() {
'use strict';

    var dir = 'views';
    angular
        .module('settings', ['settingsField'])
        .config(routes)
        .controller('settingsCrtl', settingsCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.settings', {
                url: '/settings',
                templateUrl: dir + '/settings/settings.html',
                controller: settingsCrtl,
                controllerAs: '$ctrl',
                cache: false
            });
    }

    settingsCrtl.$inject = ['stateManager', 'authService'];
    function settingsCrtl(stateManager, authService) {
        var $ctrl = this;

        $ctrl.cancel = cancel;
        $ctrl.save = save;

        activate();

        ////////////////

        function activate() {
            console.log('activated!', authService.currentUser());
            $ctrl.user = authService.currentUser();
        }

        function cancel() {
            console.log('Canceled');
            $ctrl.user = authService.currentUser();
        }

        function save() {
            console.log('Saving!', $ctrl.user);
            // TODO: authService.currentUSer().update(updates);
        }

    }
})();