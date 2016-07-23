(function () {

    'use strict';

    angular.module(RAJIND.CONFIGURE_BANK_MODULE).controller("ConfigurebankController", ConfigurebankController);

    ConfigurebankController.$inject = ["dynamicDataService"];

    function ConfigurebankController(dynamicDataService) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.modeOfTransfers = dynamicDataService.getBankModeOfTransfers();
        vm.configuredBanks = dynamicDataService.getConfiguredBanks();
        vm.addItem = addItem;
        vm.bank = emptyBankObject();
        vm.showUpdateButton = false;
        vm.selectBank = selectBank;


        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================       

        function addItem(bank) {

            if (bank.bankName == "" && bank.bankShortName == "" || bank.selectedBankTransfers == undefined) {
                return;
            }

            if (bank.id == null) {

                bank.id = vm.configuredBanks.length + 1;
                vm.configuredBanks.push(
                    {
                        bankName: bank.bankName,
                        bankShortName: bank.bankShortName,
                        transferTypes: bank.selectedBankTransfers
                    });
            }

            if (bank.id != null) {
                for (var i = 0; i < vm.configuredBanks.length; i++) {
                    if (vm.configuredBanks[i].id == bank.id) {
                        vm.configuredBanks[i].bankName = bank.bankName;
                        vm.configuredBanks[i].bankShortName = bank.bankShortName;
                        vm.configuredBanks[i].transferTypes = bank.selectedBankTransfers;
                    }
                }
            }

            reset();
        };

        function selectBank(bank) {
            vm.bank.id = bank.id;
            vm.bank.bankName = bank.bankName;
            vm.bank.bankShortName = bank.bankShortName;
            vm.bank.selectedBankTransfers = bank.transferTypes;

            vm.showUpdateButton = true;
        };

        function reset() {
            vm.bank = emptyBankObject();
            $("#bankName").focus();
            vm.showUpdateButton = false;
        };

        function emptyBankObject() {
            return {
                id: null,
                bankName: "",
                bankShortName: "",
                selectedBankTransfers: null
            };
        }
    }

})();