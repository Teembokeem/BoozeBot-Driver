(function() {
'use strict';

    angular
        .module('auth')
        .config(addInterceptor)
        .factory('authInterceptor', authInterceptor);

    addInterceptor.$inject = ['$httpProvider'];
    function addInterceptor($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }

    authInterceptor.inject = ['tokenService'];
    function authInterceptor(tokenService) {
        var service = {
            request:request
        };

        return service;

        ////////////////
        function request(config) {
            var token = tokenService.getToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        }
    }
})();