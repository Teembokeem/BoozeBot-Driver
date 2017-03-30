(function() {
'use strict';

    var dir = 'views';
    angular
        .module('scanner', [])
        .config(routes)
        .controller('scannerCrtl', scannerCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.scanner', {
                url: '/scanner',
                templateUrl: dir + '/scanner/scanner.html',
                controller: scannerCrtl,
                controllerAs: '$ctrl'
            });
    }

    scannerCrtl.$inject = ['stateManager', 'Order', 'uploadService', '$scope'];
    function scannerCrtl(state, Order, uploadService, $scope) {
        var $ctrl = this,
            camready = false;
        $ctrl.scan = scan;
        $ctrl.retakePicture = takePicture();
        $ctrl.img;

        activate();

        ////////////////

        function activate() {
            // if (!Order.current) {
            //     return state.goNoBack('app.orders');
            // }
            $ctrl.currentOrder = Order.findById($stateParams.id)
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        function onDeviceReady() {

            takePicture();
        };

        function goToVerify() {
            state.go('app.signature');
        }

        function scan() {
            uploadService.uploadFile('data:image/jpeg;base64,' + $ctrl.img).then(function(success) {
                console.log("back from cloudinary", success);
                Order.current.idPicture = success.secure_url;
                goToVerify();
            })
        }

        function takePicture() {
            return navigator.camera.getPicture( function(success){
                console.log("SUCCESS");
                $ctrl.img = success;
                angular.element(document.querySelector('#scanner-image'))[0].src = 'data:image/jpeg;base64,' + success;
            }, function(err) {
                console.log("ERROR", err);
            }, {destinationType: Camera.DestinationType.DATA_URL} );
        }
    }
})();