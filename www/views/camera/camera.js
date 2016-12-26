(function() {
'use strict';

    angular
        .module('camera', [])
        .config(routes)
        .controller('cameraCtrl', cameraCtrl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = 'views/camera';
        $stateProvider
            .state('tab.camera', {
                url: '/camera',
                views: {
                    'tab-camera': {
                        templateUrl: dir + '/camera.html',
                        controller: 'cameraCtrl',
                        controllerAs: '$ctrl'
                    }
                }
            });
    }

    cameraCtrl.$inject = [];
    function cameraCtrl() {
        var vm = this;


        activate();

        ////////////////

        function activate() {

        }
    }
})();