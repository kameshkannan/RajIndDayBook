(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("residentialAddress", residentialAddressDirective);

    function residentialAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/residentialAddress/residentialAddress.html',
            scope: {
                applicantData: '=',
                uidata: '=',
                indicators: '='
            },
            controller: residentialAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    residentialAddressController.$inject = ["staticDataService", "disclosureService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function residentialAddressController(staticDataService, disclosureService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.differentMailingAddress = differentMailingAddress;
        vm.setIndicator = setIndicator;
        vm.onStateChanged = onStateChanged;
        vm.showHidepreviousAddressPanel = showHidepreviousAddressPanel;        

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.residentialAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_RESIDENTIAL_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_RESIDENTIAL_ADDRESS_INFO);
            }
        });

        function initializeDirective() {
            //Note: Permanent Address is nothing but the Residential Address in the UI
            if (vm.uidata == undefined) {
                //do something;
                return;
            };

            vm.applicantData.hideMailingAddress = false;
            vm.applicantData.mailingAddress.streetAddress = vm.uidata.streetAddress;
            vm.applicantData.mailingAddress.aptNumber = vm.uidata.aptNumber;
            vm.applicantData.mailingAddress.city = vm.uidata.city;
            vm.applicantData.mailingAddress.state = vm.uidata.state;
            vm.applicantData.mailingAddress.zip = vm.uidata.zip;

            vm.applicantData.differentMailingAddressInd = (vm.applicantData.differentMailingAddressInd == null) ? "" : vm.applicantData.differentMailingAddressInd;
            vm.applicantData.nonAppSpouseInd = (vm.applicantData.nonAppSpouseInd == null) ? "" : vm.applicantData.nonAppSpouseInd;
        };

        function differentMailingAddress() {

            vm.indicators.hideMailingAddress = vm.applicantData.differentMailingAddressInd;

            if (vm.applicantData.differentMailingAddressInd == "Y") {
                vm.applicantData.mailingAddress.streetAddress = "";
                vm.applicantData.mailingAddress.aptNumber = "";
                vm.applicantData.mailingAddress.city = "";
                vm.applicantData.mailingAddress.state = "";
                vm.applicantData.mailingAddress.zip = "";
                vm.indicators.hideMailingAddress = true;
            };

            if (vm.applicantData.differentMailingAddressInd == "N") {
                vm.applicantData.mailingAddress.streetAddress = vm.uidata.streetAddress;
                vm.applicantData.mailingAddress.aptNumber = vm.uidata.aptNumber;
                vm.applicantData.mailingAddress.city = vm.uidata.city;
                vm.applicantData.mailingAddress.state = vm.uidata.state;
                vm.applicantData.mailingAddress.zip = vm.uidata.zip;
                vm.indicators.hideMailingAddress = false;
            };
        };

        function setIndicator() {
            vm.indicators.nonAppSpouseInd = vm.applicantData.nonAppSpouseInd;
        }

        function showHidepreviousAddressPanel() {

            var totalMonths = 0;

            if (((vm.uidata.timeAtAddress.years) != undefined && (vm.uidata.timeAtAddress.years) != null)
                 && ((vm.uidata.timeAtAddress.months) != undefined && (vm.uidata.timeAtAddress.months) != null)) {
                if (vm.uidata.timeAtAddress.years * 12)
                    totalMonths = parseInt(vm.uidata.timeAtAddress.years * 12);
                if (vm.uidata.timeAtAddress.months)
                    totalMonths += parseInt(vm.uidata.timeAtAddress.months);
            }

            if (totalMonths != 0 && totalMonths < 24) {
                vm.indicators.showPreviousAddress = true;
            }
            else {
                vm.indicators.showPreviousAddress = false;
            }
        };

        function onStateChanged() {
            vm.indicators.residentialState = vm.uidata.state;
            if (vm.uidata.state == "LA") {
                disclosureService.disclosureInput.state = vm.uidata.state;
                disclosureService.showDisclosure();
            }
        };
    };
})();