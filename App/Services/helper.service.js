
(function () {

    'use strict';

    angular.module(UCACS.SERVICES_MODULE).factory("helperService", helperService);

    helperService.$inject = ['viewDataService'];

    function helperService(viewDataService) {

        //=======================================================================================================================
        //Service Method Definitions 
        //=======================================================================================================================
        var service = {};
        service.isValidDate = isValidDate;
        service.isValidDateOfBirth = isValidDateOfBirth;
        service.isCoapplicantExists = isCoapplicantExists;
        service.isJointApplicant = isJointApplicant;
        service.isCoapplicantExists = isCoapplicantExists;
        service.emptyGivenObject = emptyGivenObject;
        return service;


        //=======================================================================================================================
        //Service method Implementations
        //=======================================================================================================================

        function isValidDate(inputDate) {

            if (inputDate == null || inputDate == undefined) {
                return false;
            }
            // parse date into variables
            var month = inputDate.substr(0, 2);
            var day = inputDate.substr(2, 2);
            var year = inputDate.substr(4);

            // check month range
            if (month < 1 || month > 12) {
                return false; //Invalid Date
            }

            if (day < 1 || day > 31) {
                return false; //Invalid Date
            }

            if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
                return false; //Invalid Date
            }

            // check for february 29th
            if (month == 2) {
                var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                if (day > 29 || (day == 29 && !isleap)) {
                    return false; //Invalid Date
                }
            }

            return true; //ValidDate
        };

        //Date of Birth format validation
        function isValidDateOfBirth(inputDateofBirth) {

            if (this.isValidDate(inputDateofBirth) == false) {
                return false;
            }
            var date = new Date();

            if (inputDateofBirth != null && inputDateofBirth != undefined) {
                if (inputDateofBirth.length == 8) {
                    var month = inputDateofBirth.substr(0, 2);
                    var day = inputDateofBirth.substr(2, 2);
                    var year = inputDateofBirth.substr(4);

                    var DOB = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), 0, 0, 0);
                    var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                    if (DOB.getTime() > currentDate.getTime()) {
                        return false;
                    }
                    return true;
                }
            }
        };

        function isCoapplicantExists() {

            if (ucacsInitialData != undefined && ucacsInitialData != '') {
                var initialDataJSON = JSON.parse(ucacsInitialData);
               
                if (initialDataJSON.appInfo != undefined && initialDataJSON.appInfo !== null) {
                    if (initialDataJSON.appInfo.appNumber != undefined &&
                        initialDataJSON.appInfo.appNumber !== '' &&
                        initialDataJSON.appInfo.coappNumber != undefined &&
                        initialDataJSON.appInfo.coappNumber !== ''
                     ) {
                        return true;
                    } else if (initialDataJSON.appInfo.appNumber != undefined &&
                        initialDataJSON.appInfo.appNumber !== '') {
                        return false;
                    }
                }               
            }

            return null;
        };

        
        function isJointApplicant() {

            var coApp = viewDataService.getCommonInfo();

            if (coApp != undefined && coApp.coAppExists != undefined && coApp.coAppExists != '' && coApp.coAppExists == 'Y') {
                return true;
            } else {
                return false;
            }
            return null;
        };

        function emptyGivenObject(object) {

            for (var key in object) {
                if (object.hasOwnProperty(key)) {

                    //Note: Below logic is usig Recursion !!!! (Kamesh)
                    if (angular.isObject(object[key]) == true) {
                        object[key] = emptyGivenObject(object[key]);
                    } else {
                        object[key] = '';
                    }
                }
            }

            return object;
        };
    }
})();