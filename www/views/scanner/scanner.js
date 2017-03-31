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

    scannerCrtl.$inject = ['stateManager', 'Order', 'uploadService', '$scope', '$ionicLoading'];
    function scannerCrtl(state, Order, uploadService, $scope, $ionicLoading) {
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
            $ctrl.currentOrder = Order.currect
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        function onDeviceReady() {
            takePicture();
        };

        function goToVerify() {
            state.go('app.signature');
        }

        function scan() {
            $ionicLoading.show({
                template: 'Uploading...',
            })
            uploadService.uploadFile('data:image/jpeg;base64,' + $ctrl.img)
            .then(function(success) {
                console.log("back from cloudinary", success);
                Order.current.idPicture = success.secure_url;
                $ionicLoading.hide()
                .then(function(){
                    goToVerify();
                });
            })
            .catch(function(err) {
                $ionicLoading.hide()
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