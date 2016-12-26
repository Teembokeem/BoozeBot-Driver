(function() {
'use strict';

    angular
        .module('auth')
        .factory('authUser', authUser);

    authUser.inject = [];
    function authUser() {

        function authUser(data) {
            Object.assign(this, data);
            return this;
        }
        return authUser;

        ////////////////
    }
})();