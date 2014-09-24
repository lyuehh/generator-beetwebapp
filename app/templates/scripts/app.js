'use strict';

angular.module('app', ['ui.router', 'ngSanitize', 'ngResource'])
.constant('appConfig', {
    'backend': 'http://xxx.xx.com',
    'version': '0.0.1'
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'partials/index.html',
        controller: 'MainCtrl'
    });
    $urlRouterProvider.otherwise('/');
});
