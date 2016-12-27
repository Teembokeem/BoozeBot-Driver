(function() {
    'use strict';

    angular.module('api', [
    ])
    .factory('Schema', Schema);

    Schema.$inject = [];
    function Schema() {
        var cnt = 1;
        var service = {
            register:register
        };

        return service;

        ////////////////
        function register(obj) {
            return function validator(data, model) {
                for (var i in obj) {
                    var checkField = obj[i],
                        makeField = data[i];
                    if (!makeField) {
                        if (checkField.required) {
                            throw 'Error ' + i + ' is required!';
                        }
                    }
                    else if(typeof checkField() == typeof checkField(makeField)) {
                        model[i] = makeField;
                    } else {
                        console.log(i + ' is not allowed');
                    }
                }
                if (!model._id) {
                    model._id = genId();
                }
                return model;
            }
        }

        function genId() {
            return '197_a23' + cnt++ + '12a-5' + cnt;
        }
    }
})();