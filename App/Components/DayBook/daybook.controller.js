
(function () {

    'use strict';

    angular.module(RAJIND.DAYBOOK_MODULE).controller("DaybookController", DaybookController);

    DaybookController.$inject = ["dynamicDataService"];

    function DaybookController(dynamicDataService) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.today = dynamicDataService.getTodayBook();
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

            if (item.particulars == "" && item.cashPayment == null && item.cashReceipt == null) {
                return;
            }
            if (item.cashPayment == null && item.cashReceipt == null) {
                return;
            }

            if (item.id == null) {

                item.id = vm.today.length + 1;
                vm.today.push(
                    {
                        particulars: getParticulars(item),
                        cashReceipt: item.cashReceipt || 0,
                        cashPayment: item.cashPayment || 0,
                        bankId: item.bankId,
                        transferModeId: item.transferModeId,
                        configuredTranId: item.configuredTranId
                    });

            }

            if (item.id != null) {
                for (var i = 0; i < vm.today.length; i++) {
                    if (vm.today[i].id == item.id) {
                        vm.today[i].particulars = getParticulars(item);
                        vm.today[i].cashReceipt = item.cashReceipt || 0;
                        vm.today[i].cashPayment = item.cashPayment || 0;
                        vm.today[i].bankId = item.bankId;
                        vm.today[i].transferModeId = item.transferModeId;
                        vm.today[i].configuredTranId = item.configuredTranId;
                    }
                }
            }

            reset();
            calculateDayTotal();
            vm.updateSelected = false;
        };

        function deleteDaybookItem() {
            for (var i = vm.today.length -1; i >=0 ; i--) {
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

            vm.item.id = item.id;
            var position = item.particulars.indexOf('(');

            if (position == -1)
                vm.item.particulars = item.particulars;
            else
                vm.item.particulars = item.particulars.substring(0, position);

            vm.item.cashReceipt = (item.cashReceipt == "") ? item.cashReceipt : parseFloat(item.cashReceipt);
            vm.item.cashPayment = (item.cashPayment == "") ? item.cashPayment : parseFloat(item.cashPayment);
            vm.item.configuredTranId = item.configuredTranId;
            vm.item.bankId = item.bankId;
            vm.item.transferModeId = item.transferModeId;

            getBanksFor(item.configuredTranId);
            vm.getTransferModesForBank(vm.item.configuredTranId, vm.item.bankId);

            if (item.configuredTranId != '')
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
                if (vm.item.particulars == vm.autoList[i].name) {
                    vm.item.configuredTranId = vm.autoList[i].id;
                    vm.bankTran = true;

                    //Call the Bank 
                    getBanksFor(vm.item.configuredTranId);
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

            if (item.configuredTranId != undefined && item.configuredTranId != null && item.configuredTranId != '') {
                var bankName = dynamicDataService.getBankShortName(vm.item.bankId);
                var bankTransferName = dynamicDataService.getBankTransferType(vm.item.bankId, vm.item.transferModeId)
                return item.particulars + ' (' + bankName + ' - ' + bankTransferName + ')';
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
                id: null,
                particulars: "",
                configuredTranId: '',
                bankId: '',
                transferModeId: '',
                cashReceipt: null,
                cashPayment: null
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