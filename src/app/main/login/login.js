'use strict';
import template from './login.html';

angular.module('login', ['ngRoute'])
    .component('login', {
        template,
        controller: ('LoginController', ['$window', '$location', LoginController]),
        controllerAs: 'vm'
    });

function LoginController(window, $location) {
    const vm = this;
    vm.$onInit = function () {
        vm.username = 'test';
        const  checkIfLoggedIn = window.localStorage.getItem('username');
        if (checkIfLoggedIn) {
            $location.path("/chat");
        }
    };
    vm.validate = function (event) {
        if (event.keyCode > 64 && event.keyCode < 91 && vm.username.length < 20) {
            event.preventDefault();
            vm.username += event.key;
        }
        if (event.keyCode !== 8) {
            event.preventDefault();
        }
    };

    vm.signIn = function () {
        window.localStorage.setItem('username', vm.username);
        $location.path("/chat");
    };

}
