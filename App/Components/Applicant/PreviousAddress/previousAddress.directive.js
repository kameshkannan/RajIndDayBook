(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("previousAddress", previousAddressDirective);

    function previousAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/PreviousAddress/previousAddress.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: previousAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    previousAddressController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function previousAddressController(staticDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.previousAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PREVIOUS_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PREVIOUS_ADDRESS_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };
    };
})();