
(function () {

    'use strict';

    angular.module(UCACS.SERVICES_MODULE).factory("viewDataService", viewDataService);

    viewDataService.$inject = ["$window"];

    function viewDataService($window) {
        var service = {};

        service.viewModel = [];
        service.initialData = {};

        service.storeViewModel = function (data) {
            this.viewModel = changeNulltoEmpty(JSON.parse(data));
        };

        service.storeInitialData = function (data) {
            if (data != undefined && data != '') {
                service.initialData = JSON.parse(data);
            }
        };

        service.setSessionId = function () {
            service.viewModel.commonInfo.sessionId = service.initialData.SessionId;
        };

        service.getEntireViewModel = function () {
            return this.viewModel;
        };

        service.getInitialData = function () {
            return this.initialData;
        };

        service.getApplicant = function () {
            return this.viewModel.applicant;
        };

        service.getCoApplicant = function () {
            return this.viewModel.coApplicant;
        };

        service.getProductSpecific = function () {
            return this.viewModel.productSpecific;
        };

        service.getFeatures = function () {
            return this.viewModel.features;
        };

        service.getContactInformation = function () {
            return this.viewModel.contactInformation;
        };

        service.getSubmit = function () {
            return this.viewModel.submit;
        };

        service.getDisclosures = function () {
            var disclosureViewModel = $window.localStorage.getItem('disclosureViewModel');
            if (disclosureViewModel != undefined && disclosureViewModel != "undefined") {                
                this.viewModel.disclosures = JSON.parse(disclosureViewModel);
            }
            if (this.viewModel.disclosures != undefined)
                return this.viewModel.disclosures;
        };        

        service.getSavedAppSection = function () {

            if (this.viewModel.savedApp != undefined) {
                return this.viewModel.savedApp;
            }
        };

        service.getCommonInfo = function () {
            return this.viewModel.commonInfo;
        };

        service.setCoApplicant = function (coapp) {
            this.viewModel.coApplicant = coapp;
            this.viewModel.commonInfo.coAppExists = "Y";
        }

        service.swapAppWithCoApp = function () {

            var appCopy = angular.copy(this.viewModel.applicant);
            var coAppCopy = angular.copy(this.viewModel.coApplicant);
            var discoveryCopy = appCopy.discovery;

            this.viewModel.applicant = coAppCopy;
            this.viewModel.coApplicant = appCopy;
            this.viewModel.applicant.discovery = discoveryCopy;
        };

        service.removeCoApplicant = function () {
            this.viewModel.coApplicant = null;
            this.viewModel.commonInfo.coAppRemoved = "Y";
            return this.viewModel;
        };

        function changeNulltoEmpty(inputObject) {

            if (inputObject != undefined && inputObject != '') {
                for (var key in inputObject) {
                    if (null === inputObject[key])
                        inputObject[key] = '';
                    if (typeof inputObject[key] === 'object')
                        changeNulltoEmpty(inputObject[key]);
                }
            }
            return inputObject;
        };

        return service;
    }
})();