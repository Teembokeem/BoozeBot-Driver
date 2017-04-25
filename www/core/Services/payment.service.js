(function() {
  'use strict';
  // TODO:
  // 1. do event service

  angular
    .module('Services')
    .factory('paymentService', paymentService);

  var upload = {}

  paymentService.$inject = ['$log', '$q', '$http', 'url'];

  function paymentService($log, $q, $http, url) {

    var service = {
      verify: verify,
    };
    var timeout = 6000;

    // EXPORTED FUNCTIONS
    function verify(act, card) {

      // Real upload
      return $http({
          url: url.base + '/api/customers/stripe', 
          method: "PUT",
          data: {
            stripeID: act,
            cardID: card,
          }
        })
        .then(function(response) {
          // response.data = autoRotate(response.data)
          return response
        })
        .catch(function(err) {
          throw err;
        })
    }


    return service;
  }
})();
