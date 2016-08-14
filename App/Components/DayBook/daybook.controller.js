
(function () {

    'use strict';

    angular.module(RAJIND.DAYBOOK_MODULE).controller("DaybookController", DaybookController);

    DaybookController.$inject = ["dynamicDataService"];

    function DaybookController(dynamicDataService) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.today = [];

        dynamicDataService.getTodayBook().then(function (response) {
            vm.today = response.data;
        });

        vm.addItem = addDayBookItem;
        vm.selectItem = selectItem;

        vm.autoList = dynamicDataService.getConfiguredTransNames();
        vm.getBanksFor = getBanksFor;
        vm.getTransferModesForBank = getTransferModesForBank;
        vm.clearItem = clearItem;
        vm.setId = setId;
        vm.anyRowSelected = anyRowSelected;
        vm.selectOrUnSelectAllRows = selectOrUnSelectAllRows;
        vm.deleteDaybookItem = deleteDaybookItem;

        calculateDayTotal();
        reset();

        //Controller Member(s) Initialization 
        vm.banks = {
            bankId: '',
            bankShortName: ''
        };

        vm.transferModes = [{
            transferModeId: '',
            transferModeName: ''
        }];

        vm.bankTran = false;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================       
        function addDayBookItem(item) {

            if (item.Particulars == "" && item.CashPayment == null && item.CashReceipt == null) {
                return;
            }
            if (item.CashPayment == null && item.CashReceipt == null) {
                return;
            }

            if (item.Id == null) {

                item.Id = vm.today.length + 1;
                vm.today.push(
                    {
                        Particulars: getParticulars(item),
                        CashReceipt: item.CashReceipt || 0,
                        CashPayment: item.CashPayment || 0,
                        BankId: item.BankId,
                        TransferModeId: item.TransferModeId,
                        ConfiguredTranId: item.ConfiguredTranId
                    });

            }

            if (item.Id != null) {
                for (var i = 0; i < vm.today.length; i++) {
                    if (vm.today[i].Id == item.Id) {
                        vm.today[i].Particulars = getParticulars(item);
                        vm.today[i].CashReceipt = item.CashReceipt || 0;
                        vm.today[i].CashPayment = item.CashPayment || 0;
                        vm.today[i].BankId = item.BankId;
                        vm.today[i].TransferModeId = item.TransferModeId;
                        vm.today[i].ConfiguredTranId = item.ConfiguredTranId;
                    }
                }
            }

            reset();
            calculateDayTotal();
            vm.updateSelected = false;
        };

        function deleteDaybookItem() {
            for (var i = vm.today.length - 1; i >= 0 ; i--) {
                if (vm.today[i].rowSelected) {
                    vm.today.splice(i, 1);
                }
            }
            reset();
            calculateDayTotal();
        };

        function clearItem() {
            reset();
        }

        function anyRowSelected() {

            for (var i = 0; i < vm.today.length; i++) {
                if (vm.today[i].rowSelected) {
                    return true;
                }
            }

            return false;
        }

        function selectOrUnSelectAllRows() {

            for (var i = 0; i < vm.today.length; i++) {
                if (vm.allRows)
                    vm.today[i].rowSelected = true;
                else
                    vm.today[i].rowSelected = false;
            }
        }

        function selectItem(item) {

            vm.item.Id = item.Id;
            var position = item.Particulars.indexOf('(');

            if (position == -1)
                vm.item.Particulars = item.Particulars;
            else
                vm.item.Particulars = item.Particulars.substring(0, position);

            vm.item.CashReceipt = (item.CashReceipt == "") ? item.CashReceipt : parseFloat(item.CashReceipt);
            vm.item.CashPayment = (item.CashPayment == "") ? item.CashPayment : parseFloat(item.CashPayment);
            vm.item.ConfiguredTranId = item.ConfiguredTranId;
            vm.item.BankId = item.BankId;
            vm.item.TransferModeId = item.TransferModeId;

            getBanksFor(item.ConfiguredTranId);
            vm.getTransferModesForBank(vm.item.ConfiguredTranId, vm.item.BankId);

            if (item.ConfiguredTranId != '')
                vm.bankTran = true;
            else
                vm.bankTran = false;

            vm.updateSelected = true;

        };

        function getBanksFor(configuredTranId) {
            vm.banks = dynamicDataService.getBanksFor(configuredTranId);
        }

        function getTransferModesForBank(configuredTranId, bankId) {
            vm.transferModes = dynamicDataService.getTransferModesForBank(configuredTranId, bankId);
        }

        //This method will set the Bank related details when selecting from Drop down.
        function setId() {
            for (var i = 0; i < vm.autoList.length; i++) {
                if (vm.item.Particulars == vm.autoList[i].name) {
                    vm.item.ConfiguredTranId = vm.autoList[i].id;
                    vm.bankTran = true;

                    //Call the Bank 
                    getBanksFor(vm.item.ConfiguredTranId);
                    break;
                } else {
                    vm.item.configuredTranId = '';
                }
            }
        }

        //=======================================================================================================================
        //  Controller Helper Functions
        //=======================================================================================================================  

        function getParticulars(item) {

            if (item.ConfiguredTranId != undefined && item.ConfiguredTranId != null && item.ConfiguredTranId != '') {
                var bankName = dynamicDataService.getBankShortName(vm.item.BankId);
                var bankTransferName = dynamicDataService.getBankTransferType(vm.item.BankId, vm.item.TransferModeId)
                return item.Particulars + ' (' + bankName + ' - ' + bankTransferName + ')';
            }

            return item.particulars;
        }

        function addTwoDecimal(item) {
            var exists = item.indexOf('.');
            if (exists == -1)
                return item + '.00';
            else
                return item;
        }

        function reset() {
            vm.item = {
                Id: null,
                Particulars: "",
                ConfiguredTranId: '',
                BankId: '',
                TransferModeId: '',
                CashReceipt: null,
                CashPayment: null
            };

            vm.transferModes = [];
            vm.bankTran = false;
            vm.updateSelected = false;
            vm.allRows = false;

            $("#particulars").focus();
        };

        function calculateDayTotal() {

            vm.cashPaymentsTotal = 0;
            vm.cashReceiptsTotal = 0;
            for (var i = 0; i < vm.today.length; i++) {
                vm.cashPaymentsTotal = vm.cashPaymentsTotal + parseFloat(vm.today[i].cashPayment || 0);
                vm.cashReceiptsTotal = vm.cashReceiptsTotal + parseFloat(vm.today[i].cashReceipt || 0);
            }
        }

    };
})();