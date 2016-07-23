(function () {
    'use strict';

    angular.module("app").controller("AppController", AppController);

    AppController.$inject = ["$rootScope", "$scope", "$location", "$window"];

    function AppController($rootScope, $scope, $location, $window) {
        var vm = this;
    }

})();