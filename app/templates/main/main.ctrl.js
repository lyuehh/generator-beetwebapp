(function() {
    'use strict';

    angular.module('app')
    .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl() {
        var vm = this;
        vm.date = new Date();

    }


})();
