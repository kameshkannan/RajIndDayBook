
(function () {

    'use strict';


    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("applicantPersonalInfo", applicantPersonalInfoDirective);

    function applicantPersonalInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/ApplicantPersonalInfo/applicantPersonalInfo.html',
            scope: {
                uidata: '=',
            },
            controller: applicantPersonalInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    applicantPersonalInfoController.$inject = ["staticDataService", "$scope", "navigationService", "helperService", "APPLICANT_CONSTANTS"];

    function applicantPersonalInfoController(staticDataService, $scope, navigationService, helperService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.updateResidentAlien = updateResidentAlien;
        vm.validateDateOfBirth = validateDateOfBirth;
        vm.isValidDateInd = true;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================


        $scope.$on('isScreenInputValid', function () {
            if ($scope.appPersonalInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PERSONAL_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PERSONAL_INFO);
            }
        });

        function initializeDirective() {

            if (vm.uidata == undefined) {
                //todo
                return;
            };
            vm.uidata.middleInitial = (vm.uidata.middleInitial == "") ? "" : vm.uidata.middleInitial.substring(0, 1);
            vm.uidata.directorOrExecutive = (vm.uidata.directorOrExecutive == null) ? "" : vm.uidata.directorOrExecutive;
        };

        //Resident Alien selected based on Country of Citizenship
        function updateResidentAlien() {
            if (vm.uidata != null) {
                if (vm.uidata.countryOfCitizenship == 'US') {
                    vm.uidata.residentAlien = 'N';
                    vm.isResidentAlienInd = false;
                }
                else {
                    vm.uidata.residentAlien = '';
                    vm.isResidentAlienInd = true;
                }
            };
        };

        //Date of Birth format validation

        function validateDateOfBirth() {
            if (helperService.isValidDateOfBirth(vm.uidata.dob) == false) {
                vm.isValidDateInd = false;
            }
            else {
                vm.isValidDateInd = true;
            }
        };
    };
})();