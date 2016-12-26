(function () {
  'use strict';

  angular.module('app', [
    'ionic',
    'ionic.native',
    'core',
    'views'
  ])
    .config(routes)
    .run(init);

  // Configure routing/abstract state
  routes.$inject = ['$urlRouterProvider', 'authServiceProvider'];
  function routes($urlRouterProvider, authServiceProvider) {

    var noAuthRoute = '/login',
      authRoute = '/app';

    // App confguration goes here.
    var authService = authServiceProvider.$get();

    authService.configRoutes($urlRouterProvider.otherwise, authRoute, noAuthRoute);
  }

  // Initialize App
  init.$inject = ['$ionicPlatform'];
  function init($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

})();