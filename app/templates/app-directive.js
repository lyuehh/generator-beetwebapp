(function() {
    'use strict';

    angular.module('app')
    .directive('myTest', myTest);

    function myTest() {
        var link = function($scope, $element, $attrs) {

        };
        return {
            link: link
        };
    }
})();

