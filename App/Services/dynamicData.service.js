
(function () {

    'use strict';

    angular.module(RAJIND.SERVICES_MODULE).factory("dynamicDataService", dynamicDataService);

    dynamicDataService.$inject = ["$http"];

    function dynamicDataService($http) {

        //=======================================================================================================================
        //Service Method Definitions 
        //=======================================================================================================================

        var service = {};

        service.getTodayBook = getTodayBook;
        service.getBankModeOfTransfers = getBankModeOfTransfers;
        service.getConfiguredBanks = getConfiguredBanks;
        service.getConfiguredBankTrans = getConfiguredBankTrans;
        service.getBankName = getBankName;
        service.getBankShortName = getBankShortName;
        service.getBankTransferType = getBankTransferType;
        service.getConfiguredTransNames = getConfiguredTransNames;
        service.getBanksFor = getBanksFor;
        service.getTransferModesForBank = getTransferModesForBank;

        return service;

        //=======================================================================================================================
        //Service method Implementations
        //=======================================================================================================================

        function getTodayBook() {

            //var res = [];
            var promise = $http({
                method: "GET",
                url: "http://localhost/RajIndServices/api/daybook/",
                headers: { "Access-Control-Allow-Origin": "*" }
            })
            .then(function (data, status, headers, config) {
                console.log("Service call is success");
                return data;
            });

            return promise;
            //return dayBook.toDay;
        };

        function getBankModeOfTransfers() {
            return banks.modeOfTransfers;
        }

        function getConfiguredBanks() {
            return banks.configuredBanks;
        }

        function getConfiguredBankTrans() {
            return configuredBankTrans1.list;
        }

        function getBankName(bankId) {
            var banksList = banks.configuredBanks;
            var result;
            for (var i = 0; i < banksList.length; i++) {
                if (banksList[i].id == bankId) {
                    result = banksList[i].bankName;
                }
            }
            return result;
        }

        function getBankShortName(bankId) {
            var banks1 = getConfiguredBanks();
            var result;
            for (var i = 0; i < banks1.length; i++) {
                if (banks1[i].id == bankId) {
                    result = banks1[i].bankShortName;
                }
            }
            return result;

        }

        function getBankTransferType(bankId, transferId) {
            var banksList = banks.configuredBanks;

            for (var i = 0; i < banksList.length; i++) {
                if (banksList[i].id == bankId) {

                    for (var j = 0; j < banksList[i].transferTypes.length; j++) {
                        if (banksList[i].transferTypes[j].id == transferId) {
                            return banksList[i].transferTypes[j].transferName;
                        }

                    }
                }
            }
        }

        function getConfiguredTransNames() {
            var trans = []
            for (var i = 0; i < configuredBankTrans1.list.length; i++) {
                trans.push({ id: configuredBankTrans1.list[i].id, name: configuredBankTrans1.list[i].tranName });
            }

            return trans;
        }

        function getBanksFor(configuredTranId) {
            var banksTemp = [];
            var bankObj = [];

            for (var i = 0; i < configuredBankTrans1.list.length; i++) {
                if (configuredTranId == configuredBankTrans1.list[i].id) {
                    banksTemp = configuredBankTrans1.list[i].banks;
                }
            }

            for (var j = 0; j < banksTemp.length; j++) {
                bankObj.push({
                    bankId: banksTemp[j].bankId,
                    bankShortName: getBankShortName(banksTemp[j].bankId)
                })
            }

            return bankObj;
        }

        function getTransferModesForBank(configuredTranId, bankId) {
            var banks = [];
            var transferModes = [];

            for (var i = 0; i < configuredBankTrans1.list.length; i++) {
                if (configuredTranId == configuredBankTrans1.list[i].id) {
                    banks = configuredBankTrans1.list[i].banks;
                }
            }

            for (var j = 0; j < banks.length; j++) {
                if (bankId == banks[j].bankId) {
                    for (var i = 0; i < banks[j].transferModes.length; i++) {
                        transferModes.push({
                            transferModeId: banks[j].transferModes[i].transferId,
                            transferModeName: getBankTransferType(banks[j].bankId, banks[j].transferModes[i].transferId)
                        })
                    }
                }
            }

            return transferModes;
        }
    }

})();