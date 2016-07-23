(function () {

    'use strict';

    angular.module(RAJIND.CONFIGURE_BANKTRAN_MODULE).controller("ConfigurebanktranController", ConfigurebanktranController);

    ConfigurebanktranController.$inject = ["dynamicDataService"];

    function ConfigurebanktranController(dynamicDataService) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.configuredBankTrans = dynamicDataService.getConfiguredBankTrans();
        vm.configuredBanks = dynamicDataService.getConfiguredBanks();
        vm.bankTran = {};
        vm.getModeOfTransfers = getModeOfTransfers;
        vm.addItem = addBankTranItem;
        vm.deleteItem = deleteBankTranItem;
        vm.bankTran = {
            id: null,
            tranName: '',
            banks: []
        };
        vm.selectBank = selectBank;
        //vm.initialize = setInitialValue;
        vm.getBankName = getBankName;
        vm.getBankShortName = getBankShortName;
        vm.getBankTransferType = getBankTransferType;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================       

        function setInitialValue() {
            vm.bankTran.bank = configuredBanks[0];
        };

        function getModeOfTransfers(bank) {

            for (var i = 0; i < vm.configuredBanks.length; i++) {
                if (vm.configuredBanks[i].id == bank.id) {
                    vm.modeOfTransfers = vm.configuredBanks[i].transferTypes
                }
            }
        };

        function addBankTranItem() {

            var item = vm.selectedTransactionBank;
            if (item.bankShortName == "") {
                return;
            }

            vm.configuredBankTrans.push({
                id: vm.configuredBankTrans.length,
                tranName: getTransactionNameWithTo(vm.selectedTransactionName),
                banks: []
            });

            var currentTransIndex = vm.configuredBankTrans.length - 1;
            vm.configuredBankTrans[currentTransIndex].banks.push(getSelectedBankWithTransferType(item))

            //Reset 
            vm.selectedTransactionName = "";
            vm.selectedTransactionBank = {};
            vm.selectedTransactionBankTransferTypes = [];
            vm.modeOfTransfers = [];
        };

        function getSelectedBankWithTransferType(item) {
            var bank = {
                bankId: item.id,
                transferModes: []
            };

            for (var i = 0; i < vm.selectedTransactionBankTransferTypes.length; i++) {
                bank.transferModes.push({ transferId: vm.selectedTransactionBankTransferTypes[i].id });
            }
            return bank;
        }

        function deleteBankTranItem(item, bank) {
            for (var i = 0; vm.configuredBankTrans.length; i++) {

                if (vm.configuredBankTrans[i].id == item.id) {
                    for (var j = 0; j < vm.configuredBankTrans[i].banks.length; j++) {
                        vm.configuredBankTrans[i].banks.splice(j, 1);
                    }
                }
                if (vm.configuredBankTrans[i].banks.length == 0) {
                    vm.configuredBankTrans.splice(i, 1);
                }
            }
        }

        function getTransactionNameWithTo(name) {
            var toWordExists = (name.indexOf('To ') >= 0) ? true : false;

            if (toWordExists == false) {
                return ("To " + name);
            } else {
                return name;
            }
        };

        function selectBank(tranName, bank) {

            vm.bankTran = {
                id: bank.id,
                tranName: tranName,
                bank: bank,
                transferTypes: bank.transferModes
            };

        };

        function getBankName(bankId) {
            return dynamicDataService.getBankName(bankId);
        };

        function getBankShortName(bankId) {
            return dynamicDataService.getBankShortName(bankId);
        };

        function getBankTransferType(bankId, transferId) {
            return dynamicDataService.getBankTransferType(bankId, transferId);
        };
    };

})();