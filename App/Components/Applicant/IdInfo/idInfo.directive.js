
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("idInfo", idInfoDirective);

    function idInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/IdInfo/idInfo.html',
            scope: {
                uidata: '='
            },
            controller: idInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    idInfoController.$inject = ["staticDataService", "$scope", "navigationService", "helperService", "APPLICANT_CONSTANTS"];

    function idInfoController(staticDataService, $scope, navigationService, helperService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.validateDate = validateDate;
        vm.isValidDateInd = true;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.idInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_ID_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_ID_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign
        }

        //Date format validation
        function validateDate(inputdate) {            
            if (helperService.isValidDate(inputdate) == false) {
                vm.isValidDateInd = false;
            }
            else {
                vm.isValidDateInd = true;
            }

        };
    };
})();