angular.module("shell", []).controller("ShellController", controller);

controller.$inject = ["$scope", "$router"];

function controller($scope, $router) {
    $router.config([
        { path: "/", component: 'userInfo' }
    ]);
}