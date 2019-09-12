'use strict';
require('angular');
require('angular-route');
require('./main/login/login');
require('./main/chat/chat');
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap';


// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'login',
  'chat',
]).
config(['$routeProvider', '$locationProvider',
  function config($routeProvider, $locationProvider) {
    $routeProvider.
    when('/login', {
      template: '<login></login>'
    }).
    when('/chat', {
      template: '<chat></chat>'
    }).
    otherwise('/login');
    if(window.history && window.history.pushState){
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
  }
]);
