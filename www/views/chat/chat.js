(function () {
    'use strict';

    angular
        .module('chat', [])
        .config(routes)
        .controller('chatCtrl', chatCtrl);


    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        var dir = '/views/chat';
        $stateProvider
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: dir + '/chat.html',
                        controller: 'chatCtrl',
                        controllerAs: '$ctrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: dir + '/chat-detail.html',
                        controller: 'chatDetailCtrl',
                        controllerAs: '$ctrl'
                    }
                }
            });
    }

    chatCtrl.$inject = ['Chats'];
    function chatCtrl(Chats) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.chats = Chats.all();
        }
    }
})();