(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("mailingAddress", mailingAddressDirective);

    function mailingAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/MailingAddress/mailingAddress.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: mailingAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    mailingAddressController.$inject = ["staticDataService", "viewDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function mailingAddressController(staticDataService, viewDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;

        var applicant = viewDataService.getApplicant();
        var residentialAddress = applicant.residentialAddress;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.mailingAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_MAILING_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_MAILING_ADDRESS_INFO);
            }
        });

        function initializeDirective() {

            vm.uidata.streetAddress = residentialAddress.streetAddress;
            vm.uidata.aptNumber = residentialAddress.aptNumber;
            vm.uidata.city = residentialAddress.city;
            vm.uidata.state = residentialAddress.state;
            vm.uidata.zip = residentialAddress.zip;
        }
    };
})();