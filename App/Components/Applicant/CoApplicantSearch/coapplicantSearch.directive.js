(function () {
    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("coapplicantSearch", coapplicantSearchDirective);


    function coapplicantSearchDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/CoApplicantSearch/coapplicantSearch.html',
            scope: {
                uidata: '=',
                searchRoutes: '=',
                indicators:'='
            },
            controller: coapplicantSearchController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    coapplicantSearchController.$inject = ["staticDataService", "dynamicDataService", "viewDataService", "navigationService"];

    function coapplicantSearchController(staticDataService, dynamicDataService, viewDataService, navigationService) {

        var vm = this;
        vm.uiInputData = {};

        vm.initializeDirective = initializeDirective;
        vm.staticData = staticDataService.dropDownValues;
        vm.resetSearchParameters = resetSearchParameters;
        vm.searchCustomer = searchCustomer;
        vm.getCustomerInfo = getCustomerInfo;
        vm.selectCustomerInfo = selectCustomerInfo;
        vm.selectcoapplicant = selectcoapplicant;
        

        function resetSearchParameters() {
            vm.uiInputData.jointAuthority = "";
            vm.uiInputData.tin = "";
            vm.uiInputData.serachfirstname = "";
            vm.uiInputData.serachlastname = "";
            vm.uiInputData.serachlmiddleinitial = "";
            vm.uiInputData.serachsuffix = "";
            vm.uiInputData.searchResult = "";
            vm.uidata = "";
            vm.coApplicantInfo = "";
            vm.coApplicantInfoAcctInfo = "";
            vm.grossIncome = "";
            vm.additionalIncome = "";
            vm.showContinue = false;
        }

        //This is added because whenever modal dialogue open, we need to reset parameter
        resetSearchParameters();

        function initializeDirective() {
            resetSearchParameters();
        }

        function searchCustomer() {
            dynamicDataService.getCustomerSearchResult(vm.uiInputData.tin,
                vm.uiInputData.serachfirstname,
                vm.uiInputData.serachlastname,
                vm.uiInputData.serachlmiddleinitial,
                vm.uiInputData.serachsuffix).then(function (response) {
                    vm.uidata = response.data.results;
                    vm.rowsPerPage = 5;
                });
        }

        function custinfoService(ecn) {
            dynamicDataService.getCustomerInfo(ecn).then(function (response) {
                vm.coApplicantInfo = response.data.coApplicant;

                if (response.data.coApplicantSearch.accountInfo != undefined && response.data.coApplicantSearch.accountInfo != null)
                    vm.coApplicantInfoAcctInfo = response.data.coApplicantSearch.accountInfo;
                vm.grossIncome = 0;
                vm.additionalIncome = 0;
                angular.forEach(vm.coApplicantInfo.applicantIncome, function (income) {
                    if (income.incomeSource == "EMP") {
                        vm.grossIncome = parseInt(income.amount * 12);
                    } else {
                        vm.additionalIncome += parseInt(income.amount);
                    }
                });
            });
        }

        function getCustomerInfo(ecn) {
            vm.showContinue = false;
            custinfoService(ecn);
        }

        function selectCustomerInfo(ecn) {
            vm.showContinue = true;
            custinfoService(ecn);
        }

        function selectcoapplicant() {
            viewDataService.setCoApplicant(vm.coApplicantInfo);
            navigationService.reConfigureRoute();
            vm.searchRoutes = navigationService.getAllRoutes();
            vm.indicators.disableCoAppSearch = true;

        }
    }

})();