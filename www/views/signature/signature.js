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

    signatureCrtl.$inject = ['stateManager', 'Order', 'uploadService', '$timeout', '$ionicLoading'];
    function signatureCrtl(state, Order, uploadService, $timeout, $ionicLoading) {
        var $ctrl = this;
        var sigpad;
        var canvas
        $ctrl.signing = false
        $ctrl.signed = false
        $ctrl.prepSign = prepSign
        $ctrl.completeSign = completeSign
        $ctrl.clearSigpad = clearSigpad

        $ctrl.complete = complete;
        activate();
        
        ////////////////

        function activate() {
            $ctrl.currentOrder = Order.current
            $ctrl.currentOrder.totalQty = $ctrl.currentOrder.qty.reduce(function(a, b) {
                return a + b
            }, 0);
        }

        window.addEventListener("orientationchange", function(){
            if (!$ctrl.signing && !$ctrl.signed ) {
                $ctrl.hide()
            }
        });

        function prepSign() {
             $ctrl.show()
        }

        function completeSign() {
            screen.orientation.unlock()
            $ctrl.signed = true
            $ctrl.signing = false
        }

        function resizeCanvas() {
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = window.screen.height * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            console.log('firing here')
            sigpad.clear(); // otherwise isEmpty() might return incorrect value
        }

        function goToComplete() {
            state.go('app.completedOrder');
        }

        $ctrl.show = function() {
            $ionicLoading.show({
                template: 'Please Rotate Device',
            })
        };

        $ctrl.hide = function(){
            $ionicLoading.hide()
            .then(function(){
                $ctrl.rotateMe = false
                $ctrl.signing = true
                screen.orientation.lock('landscape');
                $timeout(function() {
                    canvas = document.getElementById('myCanvas')
                    sigpad = new SignaturePad(canvas);
                    console.log("HERE FUCKERS", sigpad)
                    resizeCanvas()
                }, 1000)
            });
        };

        function clearSigpad() {
            sigpad.clear()
        }

        function complete() {
                console.log('CONFIRMED!', sigpad.toDataURL());
                uploadService.uploadFile(sigpad.toDataURL()).then(function(success) {
                    console.log("back from cloudinary", success);
                    Order.current.signature = success.secure_url;
                    var canvas = document.querySelector('canvas');
                    sigpad = new SignaturePad(canvas);
                })
            goToComplete();
        }
    }
})();
