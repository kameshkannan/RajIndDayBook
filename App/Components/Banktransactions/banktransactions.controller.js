
(function () {

    'use strict';

    angular.module(RAJIND.BANK_TRANSACTIONS_MODULE).controller("BanktransactionsController", BanktransactionsController);

    BanktransactionsController.$inject = ["dynamicDataService", "$routeParams"];

    function BanktransactionsController(dynamicDataService, $routeParams) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.isDharaneeTrans = $routeParams.dharaneeTrans;
        vm.daybook = dynamicDataService.getTodayBook();
        vm.bankTrans = getAllBankTransactions();
        vm.modeOfTransfers = dynamicDataService.getBankModeOfTransfers();
        vm.banks = dynamicDataService.getConfiguredBanks();
        vm.getFilteredBanks = getFilteredBanks;
        vm.getFilteredModes = getFilteredModes;

        if (vm.isDharaneeTrans == 'true') {
            vm.particulars = "Dharanee"
        }
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
            vm.bankTrans = matchFound == true ? temp : getAllBankTransactions();
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

            vm.bankTrans = matchFound == true ? temp : getAllBankTransactions();
        }

        //=======================================================================================================================
        //  Helper function Implementations 
        //=======================================================================================================================       

        function getAllBankTransactions() {
            var temp = [];
            
            for (var i = 0; i < vm.daybook.length; i++) {
                if (vm.daybook[i].bankId.length != 0) {
                    temp.push({
                        id: vm.daybook[i].id,
                        bank: dynamicDataService.getBankShortName(vm.daybook[i].bankId),
                        mode: dynamicDataService.getBankTransferType(vm.daybook[i].bankId, vm.daybook[i].transferModeId),
                        particulars: vm.daybook[i].particulars,
                        cashReceipt: vm.daybook[i].cashReceipt,
                        cashPayment: vm.daybook[i].cashPayment
                    });
                }
            }
            return temp;
        }
    };
})();