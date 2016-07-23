
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_MODULE).controller("ApplicantController", ApplicantController);

    ApplicantController.$inject = ["viewDataService", "navigationService"];

    function ApplicantController(viewDataService, navigationService) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.app = viewDataService.getApplicant();
        vm.disclousure = viewDataService.getDisclosures();

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================       


        //All the dynamic properites are declared here so that we can use the status across the directives 
        vm.indicators = {
            nonAppSpouseInd: vm.app.nonAppSpouseInd,
            residentialState: vm.app.residentialAddress.state,
            hidemailingAddress: vm.app.differentMailingAddressInd,
            showPreviousAddress: "",
            showPreviousEmployment: "",
            disableDisclosure: false,
            disableCoAppSearch:false
        };

        vm.canDeactivate = function () {
            return navigationService.canProceedToNextScreen();
        };
    };
})();