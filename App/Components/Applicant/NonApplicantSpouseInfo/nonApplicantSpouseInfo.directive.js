

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("nonApplicantSpouseInfo", nonApplicantSpouseInfoDirective);

    function nonApplicantSpouseInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/nonApplicantSpouseInfo/nonApplicantSpouseInfo.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: nonApplicantSpouseInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    nonApplicantSpouseInfoController.$inject = ["staticDataService", "viewDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function nonApplicantSpouseInfoController(staticDataService, viewDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        
        var applicant = viewDataService.getApplicant();
        var personalInfo = applicant.appPersonalInfo;
        var contactInfo = applicant.contactInfo;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.nonApplicantSpouseInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_NONAPPSPOUSE_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_NONAPPSPOUSE_INFO);
            }
        });

        function initializeDirective() {

            if (vm.uidata == undefined) {
                vm.uidata.nonSpouseInfo.nonAppOutsideUS = "";
            }

            vm.uidata.nonAppOutsideUS = (vm.uidata.nonAppOutsideUS == null) ? "" : vm.uidata.nonAppOutsideUS;
        };

    };
})();