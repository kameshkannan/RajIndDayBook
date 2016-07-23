
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("previousEmploymentInfo", previousEmploymentInfoDirective);

    function previousEmploymentInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/previousEmploymentInfo/previousEmploymentInfo.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: previousEmploymentInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    previousEmploymentInfoController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function previousEmploymentInfoController(staticDataService, $scope, navigationService, constants) {
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
            if ($scope.previousEmploymentInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PREVIOUS_EMP_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PREVIOUS_EMP_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };
    };
})();