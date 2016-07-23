
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("applicantIncome", applicantIncomeDirective);

    function applicantIncomeDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/ApplicantIncome/applicantIncome.html',
            scope: {
                uidata: '='
            },
            controller: applicantIncomeController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    applicantIncomeController.$inject = ["staticDataService", "$scope", "navigationService","APPLICANT_CONSTANTS"];

    function applicantIncomeController(staticDataService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.add = add;
        vm.isDuplicate = isDuplicate;        

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.applicantIncomeForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_INCOME_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_INCOME_INFO);
            }
        });

        //When there is no applicant income, add two empty rows
        if (vm.uidata != null && vm.uidata.length == 0) {
            vm.uidata =
            [
                { incomeSource: '', description: '', amount: '0', frequency: '' },
                { incomeSource: '', description: '', amount: '0', frequency: '' }
            ];
        }

        //Add
        function add() {
            var addIncome = { incomeSource: '', description: '', amount: '0', frequency: '' };
            vm.uidata.push(addIncome);

            vm.count = vm.uidata.length;
        }

        //Check if Income Source is Selected multiple times
        function isDuplicate() {
            if (vm.uidata == undefined)
                return false;
            for (var i = 0; i < vm.uidata.length; i++) {
                var incomeSource = vm.uidata[i].incomeSource;
                for (var j = 0; j < vm.uidata.length; j++) {
                    if (i != j) {
                        if (incomeSource == vm.uidata[j].incomeSource) {
                            alert("Multiple sources of the same income type cannot be selected");
                            return;
                        }
                    }
                }
            }
        }

    };
})();
