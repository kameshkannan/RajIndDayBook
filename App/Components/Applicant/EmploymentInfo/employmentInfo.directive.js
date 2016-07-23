
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("employmentInfo", employmentInfoDirective);

    function employmentInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/EmploymentInfo/employmentInfo.html',
            scope: {
                uidata: '=',
                indicators: '=',
                disclosureData:'='
            },
            controller: employmentInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    employmentInfoController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function employmentInfoController(staticDataService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.showHidePreviousEmploymentPanel = showHidePreviousEmploymentPanel;
        vm.enableClose = enableClose;
        vm.openDisclosure = openDisclosure;


        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.employmentInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_EMPLOYMENT_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_EMPLOYMENT_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };

        function showHidePreviousEmploymentPanel() {

            var totalMonths = 0;

            if (vm.uidata.employmentPeriod.years != undefined && (vm.uidata.employmentPeriod.years) != null
                 && (vm.uidata.employmentPeriod.months) != undefined && (vm.uidata.employmentPeriod.months) != null) {
                if (vm.uidata.employmentPeriod.years * 12)
                    totalMonths = parseInt(vm.uidata.employmentPeriod.years * 12);
                if (vm.uidata.employmentPeriod.months)
                    totalMonths += parseInt(vm.uidata.employmentPeriod.months);
            }

            if (totalMonths != 0 && totalMonths < 24) {
                vm.indicators.showPreviousEmployment = true;
            }
            else {
                vm.indicators.showPreviousEmployment = false;
            }
        };

        function openDisclosure() {
            if (vm.uidata.empType == 'MENL') {
                $("#SCRAmodal").modal('show');
            }
        };

        function enableClose() {
            if (vm.disclosureData.SCRA == "N") {
                vm.isReadToCustomer = false;
            }
            else {
                vm.isReadToCustomer = true;
            }
        };
    };
})();