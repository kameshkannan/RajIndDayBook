//To-DO: Need to work on logic to show the error in model popup or as separate error page
//Kamesh 10/1/2015

(function () {
    'use strict';

    angular.module("app").config(errorHandler);

    //Note: this is $exceptionHandler decorator, used to customize according to our need 
    //If any error comes we log that as array in $rootScope and show the same to the Developer
    //(TODO) -> If it is deployed and we can show generic error message to customer and log the errors in Database 
    function errorHandler($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                var $rootScope = $injector.get("$rootScope");

                $rootScope.errors = $rootScope.errors || [];
                $rootScope.errors.push(exception.message);
             
                $delegate(exception, cause);
            };
        });

    };

})();