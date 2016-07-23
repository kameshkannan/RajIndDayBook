
(function () {

    'use strict';

    angular.module(RAJIND.VIEW_TRNSACTIONS_MODULE).controller("ViewController", ViewController);

    ViewController.$inject = ["dynamicDataService", "$routeParams"];

    function ViewController(dynamicDataService, $routeParams) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.isDharaneeTrans = $routeParams.dharaneeTrans;
        vm.daybook = getAllTransactions();
        vm.modeOfTransfers = dynamicDataService.getBankModeOfTransfers();
        vm.banks = dynamicDataService.getConfiguredBanks();
        vm.getFilteredBanks = getFilteredBanks;
        vm.getFilteredModes = getFilteredModes;

        //if (vm.isDharaneeTrans == 'true') {
        //    vm.particulars = "Dharanee"
        //}
        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================    
        function getFilteredBanks(item) {
            var temp = [];
            var matchFound = false;
            for (var i = 0; i < vm.daybook.length; i++) {
                if (vm.daybook[i].bankId == item.id) {
                    temp.push({
                        id: vm.daybook[i].id,
                        bank: dynamicDataService.getBankShortName(vm.daybook[i].bankId),
                        mode: dynamicDataService.getBankTransferType(vm.daybook[i].bankId, vm.daybook[i].transferModeId),
                        particulars: vm.daybook[i].particulars,
                        cashReceipt: vm.daybook[i].cashReceipt,
                        cashPayment: vm.daybook[i].cashPayment
                    });
                    matchFound = true;
                }
            }
            vm.bankTrans = matchFound == true ? temp : getAllTransactions();
        }

        function getFilteredModes(mode) {
            var temp = [];
            var matchFound = false;
            for (var i = 0; i < vm.daybook.length; i++) {
                if (vm.daybook[i].transferModeId == mode.id) {
                    temp.push({
                        id: vm.daybook[i].id,
                        bank: dynamicDataService.getBankShortName(vm.daybook[i].bankId),
                        mode: dynamicDataService.getBankTransferType(vm.daybook[i].bankId, vm.daybook[i].transferModeId),
                        particulars: vm.daybook[i].particulars,
                        cashReceipt: vm.daybook[i].cashReceipt,
                        cashPayment: vm.daybook[i].cashPayment
                    });
                    matchFound = true;
                }
            }

            vm.bankTrans = matchFound == true ? temp : getAllTransactions();
        }

        //=======================================================================================================================
        //  Helper function Implementations 
        //=======================================================================================================================       

        function getAllTransactions() {
            var temp = [];
            var allTrans = dynamicDataService.getTodayBook();
            for (var i = 0; i < allTrans.length; i++) {

                temp.push({
                    id: allTrans[i].id,
                    bank: dynamicDataService.getBankShortName(allTrans[i].bankId),
                    mode: dynamicDataService.getBankTransferType(allTrans[i].bankId, allTrans[i].transferModeId),
                    particulars: allTrans[i].particulars,
                    cashReceipt: allTrans[i].cashReceipt,
                    cashPayment: allTrans[i].cashPayment
                });

            }
            return temp;
        }
    };
})();