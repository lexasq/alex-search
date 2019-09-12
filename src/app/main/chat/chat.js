'use strict';
import template from './chat.html';
import * as $ from 'jquery';
import chatService from './chat.service';
angular.module('chat', ['ngRoute', 'chatService'])
    .component('chat', {
        template,
        bindings: {
            thread: '<'
        },
        controller: ('ChatController', ['$window', '$document', '$location', 'ChatService', ChatController]),
        controllerAs: 'vm'
    });

function ChatController(window, document, $location, ChatService) {
    const vm = this;
    vm.$onInit = () => {
        vm.username = window.localStorage.getItem('username');
        if (!vm.username) {
            $location.path("/login");
        }
        vm.messages = JSON.parse(window.localStorage.getItem('history')) || [];
        vm.scrollDown();
    };
    vm.askQuestion = () => {
        vm.messages.push({
            username: vm.username,
            question: vm.question,
            internal: true
        });
        let results = [];
        ChatService.letMeGoogleForYou(vm.question).then(res => {
                if (res.data.items.length > 5) {
                    results = res.data.items.filter((item, index) => index < 5);
                } else {
                    results = res.data.items;
                }
                results.forEach(item => {
                    vm.messages.push(item);
                });
                window.localStorage.setItem('history', JSON.stringify(vm.messages));
                vm.scrollDown();
                vm.question = '';
        });
    };
    vm.scrollDown = () => {
        setTimeout(() => {
            const container = $('#messages')[0];
            container.scrollTop = container.scrollHeight;
        }, 0);
    };

    vm.leaveChat = () => {
        window.localStorage.removeItem('history');
        window.localStorage.removeItem('username');
        $location.path("/login");
    };

    vm.checkEnter = (event) => {
        if (event.keyCode === 13) {
            vm.askQuestion();
        }
    };
}
