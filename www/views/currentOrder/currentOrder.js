(function() {
'use strict';

    var dir = 'views';
    angular
        .module('currentOrder', ['deliveryFail', 'cancelOrder', 'scanner', 'verifyCard', 'signature', 'completedOrder'])
        .config(routes)
        .controller('currentOrderCrtl', currentOrderCrtl);

    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('app.currentOrder', {
                url: '/currentOrder',
                templateUrl: dir + '/currentOrder/currentOrder.html',
                controller: currentOrderCrtl,
                controllerAs: '$ctrl',
                cache: false
            });
    }

    currentOrderCrtl.$inject = ['$state', 'Order', '$ionicPopup', 'NgMap', '$cordovaGeolocation', '$stateParams', 'stateManager'];
    function currentOrderCrtl($state, Order, $ionicPopup, NgMap, $cordovaGeolocation, $stateParams, state) {
        var $ctrl = this;
        $ctrl.goToOrders = goToOrders;
        $ctrl.startScan = startScan;

        activate();



        $ctrl.showNote = false;

        $ctrl.toggleNote = function() {
            $ctrl.showNote = !$ctrl.showNote;
        };

        ////////////////

        function activate() {
            if (!Order.current) {
                return state.goNoBack('app.orders');
            }
            $ctrl.currentOrder = Order.current;
            console.log($ctrl.currentOrder);

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
            $state.go('app.orders');
        };

        function startScan() {
            console.log('$ctrlanning')
            $state.go('app.scanner');
        };
    }
})();