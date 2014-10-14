'use strict';

describe('controllers', function(){
    var scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should have vm.date', inject(function($controller) {
        $controller('MainCtrl as vm', {
            $scope: scope
        });
        var vm = scope.vm;

        expect(angular.isDate(vm.date)).toBeTruthy();
    }));
});
