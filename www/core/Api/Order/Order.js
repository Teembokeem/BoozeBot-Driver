var _O, _Os, od;
(function () {
    'use strict';

    angular
        .module('OrderApi', ['api'])
        .factory('OrderDispatch', OrderDispatch)
        .factory('Order', OrderService);

        function log(str) {
            return function (data) {
                console.log(str, data);
            }
        }

    OrderDispatch.$inject = ['$q', '$http', 'url'];
    function OrderDispatch($q, $http, url) {
        var base = url.api + '/orders';
        var service = {
            get: get,
            update: update
        };
        od = service

        return service;
        /////////////////
        function format(response) {
            return response.data;
        }

        function get(id) {
            // var prom = $q.defer();
            // prom.resolve(fakeData());
            // return prom.promise;
            var query = id ? '?id=' + id : '';
            return $http.get(base + query).then(format);
        }

        function update(order) {
            return $http.put(base, order).then(format);
        }


        function fakeData() {
            return [
                {
                    _id: 1,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    _id: 2,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    _id: 3,
                    status: 'Accepted',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    _id: 4,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    _id: 5,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    _id: 6,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    address: '3683 Grandview blvd 90066',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    }
                },
                {
                    // _id: 7,
                    status: 'Assigned',
                    products: [1, 2, 3, 4],
                    total: '$100.00',
                    owner: {
                        firstName: 'Ted',
                        lastName: 'Tedson'
                    },
                    address: '3683 Grandview blvd 90066'
                }
            ];
        }
    }

    OrderService.$inject = ['Schema', '$q', '$http', 'url', 'OrderDispatch'];
    function OrderService(Schema, $q, $http, urlService, dispatch) {
        var _orders = [],
            url = urlService.api + '/admin';
        var orderSchema = Schema.register({
            _id: String,
            status: String,
            products: Array,
            driver: String,
            createdAt: String,
            qty: Array,
            tax: Number,
            subTotal: Number,
            total: Number,
            owner: Object,
            address: Object,
            creditCard: Object
        });
        _Os = orderSchema;

        // Constructor
        function Order(order) {
            var o = orderSchema(order, this);
            o.owner.fullName = order.owner.firstName + order.owner.lastName;
            _orders = _orders.concat([o]);
            Order.updateSubs();
            return o;
        }
        _O = Order

        // Model Statics (Model) Order
        Order.findById = function (id) {
            console.log('Finding', id);
            return _orders.filter(function (order) { return order._id == id; })[0];
        };

        Order.get = function () {
            return _orders;
        };

        // id is optional if not wanting to include in updates
        Order.update = function (updates, id) {
            console.log('sending update')
            var order = Order.findById(updates._id || id);
            return order ? order.update(updates) : null;
        };

        Order.create = function create(orders) {
            // Only order
            if (!Array.isArray(orders)) {
                orders = [orders];
            }
            // Many orders
            return orders.map(function (order) {
                return new Order(order);
            });
        };

        Order.clear = function () {
            _orders = [];
            Order.updateSubs();
            return this;
        };

        Order.subscribe = function (fn) {
            Order._subs = Order._subs || [];
            if (Order._subs.indexOf(fn) >= 0) {
                return Order._subs.indexOf(fn);
            }
            Order._subs.push(fn);
            return Order._subs.length - 1;
        };

        Order.unsubscribe = function(fn) {
            var idx = Order._subs.indexOf(fn);
            Order._subs.splice(idx, 1);
            return Order;
        };

        Order.updateSubs = function () {
            if (Order._subs) {
                Order._subs.forEach(function (sub) { sub(_orders) });
            }
        };

        Order.load = function () {
            Order.clear();
            return getter().then(Order.create).then(Order.updateSubs);
        };


        Order.remove = function (order) {
            if (typeof order === 'string') {
                order = Order.findById(order);
            }
            var idx = _orders.indexOf(order);
            if (idx + 1) {
                delete _orders.splice(idx, 1);
            }
            Order.updateSubs();
            return this;
        };

        Order.save = function(order) {
            return dispatch.update(order);
        };

        Order.setCurrent = function(order) {
            if (Order.current) {
                Order.current.accept();
            }
            Order.current = order;
            return Order;
        };

        Order.complete = function() {
            if (Order.current) {
                Order.current.complete();
                Order.current = null;
            }
            return Order;
        };

        Order.connectSocket = function () {
            var nsp = io('http://192.168.0.4:3000/api/orders');
            Order.attachListeners(nsp);
        }

        Order.attachListeners = function (socket) {
            socket.on('new order', function (order) {
                console.log('NEW ORDER CAUGHT', order);
                Order.create(order);
            });

            socket.on('updated order', function(order) {
                console.log('UPDATED ORDER CAUGHT', order);
                Order.update(order);
            });

            socket.on('connected', function (data) {
                console.log('Connected!', data);
            });
        };


        // ===============Protoype===================
        // Methods (documents) order
        Order.prototype.update = function (updates) {
            console.log("last step", this)
            orderSchema(updates || this, this);
            Order.updateSubs();
            dispatch.update({_id: this._id, status: this.status});
            return this;
        };

        Order.prototype.remove = function () {
            return Order.remove(this);
        };

        Order.prototype.save = function() {
            return Order.save(this);
        };

        Order.prototype.accept = function() {
            console.log('Accepting!', this);
            this.status = 'Accepted';
            this.update();
            return this;
        };

        Order.prototype.start = function() {
            console.log('Starting!', this);
            this.status = 'In Progress';
            this.update();
            Order.setCurrent(this);
            return this;
        };

        Order.prototype.cancel = function() {
            console.log('Canceling Order!', this);
            this.status = 'Canceled';
            this.update();
            return this;
        };

        Order.prototype.complete = function() {
            console.log('Completing order!');
            this.status = 'Completed';
            return this.update();
        };


        // Order.attachListeners(nsp);
        Order.load();
        Order.connectSocket();
        return Order;

        ////////////////

        function getter() {
            // var prom = $q.defer();
            // prom.resolve(fakeData());
            // $http.get(url + '/orders').then(log('Yes')).catch(log('No'));
            // return prom.promise;
            return dispatch.get().then(function(d) {
                console.log('Dipsatch retreived!', d);
                return d;
            });
        }
    }
})();