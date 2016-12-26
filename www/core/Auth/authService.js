(function () {
    'use strict'

    angular
        .module('auth', ['angular-jwt'])
        .factory('authService', authService)

// Moved to app.js
        // .config(function (authServiceProvider, $urlRouterProvider) {
        //     var authService = authServiceProvider.$get();
        //     authService.configRoutes($urlRouterProvider.otherwise, '/camera', '/begin');

        //     $urlRouterProvider.otherwise(authService.isLoggedIn() ? '/camera' : '/begin');
        // });

    authService.$inject = ['$q', 'tokenService', '$log', '$http', 'url', 'authUser'];

    function authService($q, tokenService, $log, $http, url, authUser) {
        var routes = {
            loggedIn: '/',
            loggedOut: '/',
            otherwise: function () { }
        };
        var service = {
            logIn: logIn,
            signUp: signUp,
            isLoggedIn: isLoggedIn,
            logOut: logOut,
            currentUser: currentUser,
            refreshToken: refreshToken,
            configRoutes: configRoutes,
            updateUser: storeUser,
            resetPassword: resetPassword,
            changePassword: changePassword
        };

        return service;

        function fakeAuth(data, deffered) {
            setTimeout(function () {
                if (data.email.toLowerCase() == 'test@test.com' && data.password == 'password') {
                    deffered.resolve({
                        status: 200,
                        data: {
                            message: 'Success!',
                            user: {
                                "firstName": "test",
                                "lastName": "User",
                                "email": "test@test.com",
                                "_id": 1
                            },
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiX2lkIjoxfQ.ZuUljkhZ4E6sIF6pGX2CmC-dQhCBM1ZMzdjr_zBlNq8'
                        }
                    });
                } else {
                    deffered.reject({
                        status: 403,
                        data: {
                            message: 'Bad Credentials!'
                        }
                    });
                }
            }, 1300);
        }

        function logIn(email, pass) {
            var deffered = $q.defer();

            if (!email) {
                deffered.reject('Must have a valid email address');
            }
            else if (!pass) {
                deffered.reject('Must have a valid password');
            }

            //  // Fake Api
             fakeAuth({email: email, password: pass}, deffered);
             return deffered.promise.then(function(res) {

                 return storeUser(res.data.token);
             })

            // Real Api
            // return $http({
            //     method: 'POST',
            //     url: urlFactory + '/api/authenticate',
            //     data: data
            // })
            //     .then(function (res) {
            //         tokenService.set(res.data);
            //         routes.otherwise(routes.authRoute || '/');
            //         return new authUser(tokenService.decode());
            //     })
            //     .catch(function (err) {
            //         if (err.message) {
            //             throw err.message;
            //         }
            //         if (err.data && err.data.message) {
            //             throw err.data.message;
            //         }
            //         throw err;
            //     })
        }

        function signUp(data) {
            return $http({
                method: 'POST',
                url: urlFactory + '/api/users',
                data: data
            }).then(function (res) {
                tokenService.set(res.data);
                routes.otherwise(routes.authRoute || '/');
                return new authUser(tokenService.decode());
            });
        }

        function resetPassword(email) {
            return $http({
                url: urlFactory + '/api/authenticate',
                method: 'PUT',
                data: {
                    email: email
                }
            });
        }

        function changePassword(token, password) {
            return $http({
                url: urlFactory + '/api/authenticate',
                method: 'PATCH',
                data: {
                    token: token,
                    password: password
                }
            });
        }

        function storeUser(data) {
            tokenService.set(data);
            return new authUser(tokenService.decode());
        }

        function isLoggedIn() {
            console.log('tokenService.getToken()', tokenService.getToken());

            return (tokenService.getToken() != null);
        }

        function logOut() {
            var deffered = $q.defer();
            tokenService.destroy();
            $log.debug("Goodbye.")
            routes.otherwise(routes.noAuthRoute || '/');
            localStorage.clear();
            deffered.resolve({});
            return deffered.promise;
        }

        function currentUser() {
            var tokenData = new authUser(tokenService.decode());

            if (tokenData) {
                tokenData.expiresAt = Date(tokenData.exp);

                delete tokenData.exp;
                delete tokenData.iat;
            }
            return tokenData;
        }

        function refreshToken() {
            var promise = $http({
                method: 'POST',
                url: urlFactory + '/token/refresh'
            })
                .then(function (res) {
                    tokenService.set(res.data.token);
                    return token.decode();
                });

            return promise;
        }

        function setDefault() {

            var curDefault = service.isLoggedIn() ?
                routes.loggedIn :
                routes.loggedOut;

                console.log('Allo', curDefault)
            routes.otherwise(curDefault);
            return curDefault;
        }

        function configRoutes(otherwise, authRoute, noAuthRoute) {
            routes.otherwise = otherwise;
            routes.loggedIn = authRoute;
            routes.loggedOut = noAuthRoute;

            setDefault();
        }

    }

})();