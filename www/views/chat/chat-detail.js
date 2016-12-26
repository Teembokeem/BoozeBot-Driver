(function() {
'use strict';

    angular
        .module('chat')
        .controller('chatDetailCtrl', chatDetailCtrl);

    chatDetailCtrl.$inject = ['$stateParams', 'Chats'];
    function chatDetailCtrl($stateParams, Chats) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            vm.chat = Chats.get($stateParams.chatId);
        }
    }
})();