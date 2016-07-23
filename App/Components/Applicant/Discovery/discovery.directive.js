
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("discovery", discoveryDirective);

    function discoveryDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/Discovery/discovery.html',
            scope: {
                uidata: '=',
                disclosureData: '=',
                indicators: '=',
                mainRoutes: '='
            },
            controller: discoveryController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    discoveryController.$inject = ["staticDataService", "viewDataService", "navigationService", "disclosureService", "$scope", "APPLICANT_CONSTANTS"];

    function discoveryController(staticDataService, viewDataService, navigationService, disclosureService, $scope, constants) {



        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.evaluateSourceDropDownValue = evaluateSourceDropDownValue;
        vm.showDisclosureByLanguage = showDisclosureByLanguage;

        vm.disableReservationDropdown = true;
        vm.indicators.disableDisclosure = false;

        var applicant = viewDataService.getApplicant();
        var initialData = viewDataService.storeInitialData();
        var personalInfo = applicant.appPersonalInfo;
        var contactInfo = applicant.contactInfo;
        var residenceAddress = applicant.residentialAddress;

        var currentTab = navigationService.getCurrentRoute();
        var email = contactInfo.email;
        var state = personalInfo.state;


        //=======================================================================================================================
        //  Controller Implementations
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.discoveryForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_DISCOVERY_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_DISCOVERY_INFO);
            }
        });

        function initializeDirective() {
            //.net code behind logic 
            if (vm.uidata == undefined) {
                vm.uidata.languageIndicator = "ENG";
                showDisclosurePopUp("ENG");
            }

            if (vm.mainRoutes[1].routeValue == "coapplicant")
                vm.indicators.disableCoAppSearch = true;

            if (vm.uidata.languageIndicator == "")
                vm.uidata.languageIndicator = "ENG";

            if ((vm.uidata.languageIndicator == "" || vm.uidata.languageIndicator == undefined)
                && ucacsInitialData.requestInfo != undefined && ucacsInitialData.requestInfo.productType != "ELEADS") {

                vm.indicators.disableDisclosure = true;
                vm.uidata.languageIndicator = "ENG";
                showDisclosurePopUp("ENG", residenceAddress.state, contactInfo.email, vm.uidata.source);
                return;
            }

            if (vm.uidata.languageIndicator == "" && ucacsInitialData.requestInfo != undefined && ucacsInitialData.requestInfo.productType == "ELEADS") {

                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp("ENG", residenceAddress.state, contactInfo.email, vm.uidata.source);
            }

            if (vm.uidata.languageIndicator != "") {  //&& need to get the disclosureAcceptanceDateTime) {

                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp(vm.uidata.languageIndicator, residenceAddress.state, contactInfo.email, vm.uidata.source);
            }

            //Js logic 

            //=======================================================================================================================
            // TODO: May be needed for disclosure SCRA
            //=======================================================================================================================
            //  vm.evaluateSourceDropDownValue();

            //Todo: Move to service if needed
            if (ucacsInitialData != null && ucacsInitialData != undefined) {
                var initialData = [];
                vm.initialData = JSON.parse(ucacsInitialData);
            }

        };

        function evaluateSourceDropDownValue() {

            if (vm.uidata.source != "" && vm.uidata != undefined) {

                vm.disableReservationDropdown = (vm.uidata.source == "0033" || vm.uidata.source == "0027") ? false : true;

                //=======================================================================================================================
                //  TODO: Needs the below logic to be implemented
                //=======================================================================================================================


                //if (vm.uidata.source == "0027") {
                //    //To-Do:
                //    //There is logic in the Discovery.js file line 876 to enable disable the validator
                //    //But the code 27 is not there in the drop down.
                //};

                //if (vm.uidata.source == "0002" || vm.uidata.source == "0059" || vm.uidata.source == "0087") {

                //    if (currentTab.routeName.toUpperCase() == 'APPLICANT') {
                //        vm.disclosureData.SCRA = "Y"; //TODO : why this is Y for above source
                //        showDisclosurePopUp(vm.disclosureData.SCRA, state, email, vm.uidata.source);
                //    }
                //}
            }

        };


        function showDisclosureByLanguage() {

            if (vm.uidata.languageIndicator != "") {  //&& need to get the disclosureAcceptanceDateTime) {
                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp(vm.uidata.languageIndicator, residenceAddress.state, contactInfo.email, vm.uidata.source);
            }
        };

        function showDisclosurePopUp(language, state, email, source) {

            disclosureService.disclosureInput.language = language;
            disclosureService.disclosureInput.email = email;
            disclosureService.disclosureInput.state = state;
            disclosureService.disclosureInput.source = source;
            disclosureService.showDisclosure();

            //alert("Show disclousre - Based on the parameter passed \n the disclosure content will be displayed");
        }
    };
})();

