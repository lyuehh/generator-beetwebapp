(function() {
    'use strict';

    angular.module('app')
    .service('myService', myService);

    /* @ngInject */
    function myService() {
        /* jshint validthis: true */
        var self = this;

        self.xx = function() {

        };
    }
})();


