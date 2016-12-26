(function () {
    'use strict';

    angular
        .module('chat')
        .factory('Chats', Chats);

    Chats.$inject = [];
    function Chats() {
        var service = {
            all: all,
            remove: remove,
            get: get
        };

        return service;

        ////////////////
        function all() {
            return chats;
        }
        function remove(chat) {
            chats.splice(chats.indexOf(chat), 1);
        }
        function get(chatId) {
            return chats.filter(function(chat) {
                return chat.id == chatId;
            })[0];
        }
    }

    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];
})();