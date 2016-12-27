(function() {
'use strict';

    angular
        .module('auth')
        .factory('tokenService', tokenService);

    tokenService.inject = ['cache', 'jwtHelper'];
    function tokenService(Cache, jwtHelper) {
        var cache = new Cache('driver_token');

        var service = {
            getToken:getToken,
            set: setToken,
            decode: decode,
            destroy: destroy
        };

        return service;

        ////////////////
        function getToken() {
            return cache.get();
        }
        function setToken(token) {
            cache.set(token);
            return getToken();
        }

        function destroy() {
            return setToken(null);
        }

        function decode() {
            var token = getToken();
            if (token) {
                return jwtHelper.decodeToken(token);
            }
            return false;
        }
    }
})();