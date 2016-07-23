'use strict';

(function () {
    angular.module(UCACS.SERVICES_MODULE).factory("staticDataService", staticDataService);

    staticDataService.$inject = ["$window"];

    function staticDataService($window) {

        //=======================================================================================================================
        //Service Method Definitions 
        //=======================================================================================================================

        var service = {};
        service.dropDownValues = $window.Common;
        service.disclosuresbyLanguage = $window.Disclosures;       

        //=======================================================================================================================
        //Service method Implementations
        //=======================================================================================================================       

        return service;
    }

})();