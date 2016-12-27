(function() {
'use strict';

    angular
        .module('auth')
        .factory('authUser', authUser);

    authUser.inject = [];
    function authUser() {

        function authUser(data) {
            Object.assign(this, data);
            this.firstName = this.name.first || '';
            this.lastName = this.name.last || '';
            this.fullName = this.firstName + ' ' + this.lastName;
            return this;
        }
        return authUser;

        ////////////////
    }
})();