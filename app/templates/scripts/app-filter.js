(function() {
    'use strict';

    angular.module('app')
    .filter('myFilter', myFilter);

    /* @ngInject */
    function myFilter() {
        return function(input, option) {

        };
    }
})();
