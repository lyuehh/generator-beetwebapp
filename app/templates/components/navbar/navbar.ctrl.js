(function() {
    'use strict';

    angular.module('app.navbar', [])
    .controller('NavBarCtrl', NavBarCtrl);

    /* @ngInject */
    function NavBarCtrl($interval, $scope) {
        var vm = this;
        vm.date = new Date();

        $interval(function() {
            vm.date = new Date();
        }, 1000);
    }

})();
