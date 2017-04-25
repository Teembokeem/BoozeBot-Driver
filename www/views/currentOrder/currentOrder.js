(function() {
'use strict';

    var dir = 'views';
    angular
        .module('currentOrder', ['deliveryFail', 'cancelOrder', 'scanner', 'verifyCard', 'signature', 'completedOrder'])
        .config(routes)
        .controller('currentOrderCrtl', currentOrderCtrl);
        

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.currentOrder', {
                url: '/currentOrder/:id',
                templateUrl: dir + '/currentOrder/currentOrder.html',
                controller: currentOrderCtrl,
                controllerAs: '$ctrl'
            });
    }

    currentOrderCtrl.$inject = ['$state', 'Order', '$ionicPopup', 'NgMap', '$cordovaGeolocation', '$stateParams', 'stateManager', '$ionicHistory', 'paymentService', '$scope'];
    function currentOrderCtrl($state, Order, $ionicPopup, NgMap, $cordovaGeolocation, $stateParams, state, $ionicHistory, paymentService, $scope) {
        var $ctrl = this;
        $ctrl.goToOrders = goToOrders;
        $ctrl.startScan = startScan;
        $scope.$watch('$ctrl.currentOrder', function() {
            paymentService.verify($ctrl.currentOrder.owner.stripeID, $ctrl.currentOrder.creditCard)
            .then(function(res) {
                $ctrl.currentOrder.cc = res.data
                console.log("LSDJFLSDJFKL", $ctrl.currentOrder)
            })
        })

        activate();
        



        $ctrl.showNote = false;

        $ctrl.toggleNote = function() {
            $ctrl.showNote = !$ctrl.showNote;
        };

        ////////////////

        function activate() {
            $ctrl.currentOrder = Order.findById($stateParams.id)//(function(order) { return order._id === $stateParams.id})[0];
            console.log($ctrl.currentOrder, 'here?')


            NgMap.getMap().then(function(map) {
                $ctrl.map = map;
                $ctrl.dest = [$ctrl.currentOrder.address.loc[1], $ctrl.currentOrder.address.loc[0]];
                console.log("dest?", $ctrl.dest)

                new google.maps.Marker({
                position: new google.maps.LatLng($ctrl.currentOrder.address.loc[1], $ctrl.currentOrder.address.loc[0]),
                map: $ctrl.map,
                draggable: false,
                animation: google.maps.Animation.DROP
                });
            });

            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    console.log("lat longs", $stateParams)
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                console.log("lats, longs, ", lat, long)
                $ctrl.curr = [lat, long];
                new google.maps.Marker({
                    position: new google.maps.LatLng(lat, long),
                    map: $ctrl.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });
                }, function(err) {
                // error
                });
        };

        function goToOrders() {
            // state.goNoBack('app.orders', {}, {reload: true});
        };

        function startScan() {
            console.log('$ctrlanning')
            Order.setCurrent($ctrl.currentOrder);
            $state.go('app.scanner');
        };
    }
})();
