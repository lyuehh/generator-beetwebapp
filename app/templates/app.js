'use strict';

angular.module('app', ['ui.router', 'app.navbar'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html'
    });
    $urlRouterProvider.otherwise('/');
});
