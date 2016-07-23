(function () {
    'use strict';

    angular.module(UCACS.SERVICES_MODULE).factory("navigationService", navigationService);

    navigationService.$inject = ["routeDataService", "viewDataService"];

    function navigationService(routeDataService, viewDataService) {

        var service = {};
        service.currentTab = 0;
        service.routes = [];
        service.validateScreens = [];


        //Note: This method is required, otherwise by default the route is set to Applicant, which is not right
        service.initializeRoutes = function () {
            this.routes = routeDataService.getRouteObject();
        };

        service.getAllRoutes = function () {
            return this.routes;
        };

        service.getNextRoute = function () {
            this.currentTab = this.currentTab + 1;
            return this.routes[this.currentTab];
        };

        service.getPreviousRoute = function () {
            this.currentTab = this.currentTab - 1;
            return this.routes[this.currentTab];
        };

        service.getCurrentRoute = function () {
            return this.routes[this.currentTab];
        };

        service.canNavigate = function (value, idx) {
            this.validateScreens[idx] = value;
        };

        service.canProceedToNextScreen = function () {
            for (var i = 0; i < this.validateScreens.length; i++) {
                if (this.validateScreens[i] == false)
                    return false;
            }

            return true;
        };

        //This is configure the Initial Route, if the application is loaded as SAVEDAPP we need to load 
        //the appropriate page from where the user left which all the data.
        service.configureInitialRoute = function () {
            var savedApp = viewDataService.getSavedAppSection();
            if (savedApp != undefined && savedApp.screen != undefined && savedApp.screen.id != undefined) {
                if (savedApp.screen.id != "") {
                    this.currentTab = parseInt(savedApp.screen.id);
                }
            } else {
                this.currentTab = 0;
            }
        };

        service.reConfigureRoute = function () {
            this.routes = routeDataService.getRouteObject();
            this.currentTab = 0;
        };

        service.getapplicantRoute = function () {
            this.currentTab = 0;
            service.routes = routeDataService.appObject;
        };

        return service;

    }

})();