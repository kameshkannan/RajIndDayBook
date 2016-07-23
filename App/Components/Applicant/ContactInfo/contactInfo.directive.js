
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("contactInfo", contactInfoDirective);

    function contactInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/ContactInfo/contactInfo.html',
            scope: {
                uidata: '=',
            },
            controller: contactInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    contactInfoController.$inject = ["staticDataService", "disclosureService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];


    function contactInfoController(staticDataService, disclosureService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.showDisclosure = showDisclosure;        

        vm.uidata.homePhone = (vm.uidata.homePhone == undefined) ? "" : vm.uidata.homePhone;
        vm.uidata.cellPhone = (vm.uidata.cellPhone == undefined) ? "" : vm.uidata.cellPhone;
        vm.uidata.workPhone = (vm.uidata.workPhone == undefined) ? "" : vm.uidata.workPhone;

        vm.existingEmail = "";

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.contactInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_CONTACT_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_CONTACT_INFO);
            }
        });

        function initializeDirective() {
            if (vm.uidata == undefined) {
                //do something;
                return;
            };
            //All are straightforward nothing to assign
            vm.existingEmail = vm.uidata.email;
        };

        function showDisclosure() {
            var modifiedEmail = vm.uidata.email;

            if (vm.existingEmail != modifiedEmail) {
                disclosureService.disclosureInput.email = modifiedEmail;
                disclosureService.showDisclosure();
           }
        }        
    };

})();