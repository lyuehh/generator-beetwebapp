(function() {
    'use strict';

    angular.module('app')
    .service('myService', myService);

    /* @ngInject */
    function myService() {
        this.xx = function() {

        }
    }
})();

