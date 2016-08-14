'use strict';

(function () {
    angular.module("app").controller("RouteController", RouteController);

    RouteController.$inject = ["$router", "$window", "$scope"];

    function RouteController($router, $window, $scope) {

        var vm = this;
        //$httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $router.config([
            {
                path: "/",
                component: "dashboard"
            },
            {
                path: "/dashboard",
                component: "dashboard"
            },
            {
                path: "/daybook",
                component: "daybook"
            },
            {
                path: "/configurebank",
                component: "configurebank"
            },
            {
                path: "/configurebanktran",
                component: "configurebanktran"
            },
            {
                path: "/banktransactions",
                component: "banktransactions"
            },
            {
                path: "/banktransactions/:dharaneeTrans",
                component: "banktransactions"
            },
            {
                path: "/view/:dharaneeTrans",
                component: "view"
            }
        ]);
    };

})();

