(function() {
'use strict';

    angular
        .module('cache', ['angular-storage'])
        .factory('Cache', cache);

    cache.inject = ['store'];
    function cache(store) {
        console.log('A;;')
        var _cache = store.getNamespacedStore('jasons_driver');

        function Cache(ns) {
            this.ns = ns;
            // this._cache.getNamespacedStore(ns);

            this.get = function() {
                return _cache.get(this.ns);
            };

            this.set = function(data) {
                _cache.set(this.ns, data);
                return this.get();
            };

            return this;
        }

        return Cache;

        ////////////////
    }
})();