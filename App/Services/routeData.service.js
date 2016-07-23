(function () {

    'use strict';

    angular.module(UCACS.SERVICES_MODULE).factory("routeDataService", routeDataService);


    routeDataService.$inject = ["helperService"];

    function routeDataService(helperService) {

        var service = {};
        service.appObject = [
            { id: 0, routeName: "Applicant", routeValue: "applicant" },
            { id: 1, routeName: "Product Specific", routeValue: "productspecific" },
            { id: 2, routeName: "Features", routeValue: "features" },
            { id: 3, routeName: "Contact Information", routeValue: "contactinfo" },
            { id: 4, routeName: "Submit", routeValue: "submit" }
        ];

        service.coAppObject = [
            { id: 0, routeName: "Applicant", routeValue: "applicant" },
            { id: 1, routeName: "CoApplicant", routeValue: "coapplicant" },
            { id: 2, routeName: "Product Specific", routeValue: "productspecific" },
            { id: 3, routeName: "Features", routeValue: "features" },
            { id: 4, routeName: "Contact Information", routeValue: "contactinfo" },
            { id: 4, routeName: "Submit", routeValue: "submit" }
        ];

        service.getRouteObject = function () {

            if ((helperService.isCoapplicantExists() == true) || (helperService.isJointApplicant() == true)) {
                return service.coAppObject;
            } else {
                return service.appObject;
            }
        };

        return service;
    }

})();