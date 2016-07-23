///#source 1 1 /CentralSales/Auto/App/Components/Applicant/applicant.module.js
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_MODULE,  [UCACS.APPLICANT_DIRECTIVE_MODULE,
        UCACS.SERVICES_MODULE,
        UCACS.APPLICANT_CONSTANTS_MODULE]);

})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/applicant.directives.module.js
'use strict';

(function () {
    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE,
        [
            UCACS.SERVICES_MODULE,
            UCACS.APPLICANT_CONSTANTS_MODULE
        ]);

})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/applicant.controller.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_MODULE).controller("ApplicantController", ApplicantController);

    ApplicantController.$inject = ["viewDataService", "navigationService"];

    function ApplicantController(viewDataService, navigationService) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.app = viewDataService.getApplicant();
        vm.disclousure = viewDataService.getDisclosures();

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================       


        //All the dynamic properites are declared here so that we can use the status across the directives 
        vm.indicators = {
            nonAppSpouseInd: vm.app.nonAppSpouseInd,
            residentialState: vm.app.residentialAddress.state,
            hidemailingAddress: vm.app.differentMailingAddressInd,
            showPreviousAddress: "",
            showPreviousEmployment: "",
            disableDisclosure: false,
            disableCoAppSearch:false
        };

        vm.canDeactivate = function () {
            return navigationService.canProceedToNextScreen();
        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/applicant.constants.js

(function () {

    'use strict';

    //Note: Constants can be declared as given below

    //angular.module("UCACS.Applicant.Constants")
    //    .constant("UserName", "YourValue")
    //    .constant("YourKey", "Another Value");

    //Note: OR Else as below 

    angular.module(UCACS.APPLICANT_CONSTANTS_MODULE, []).constant("APPLICANT_CONSTANTS",
        {
            //APPLICANT ENUM
            APPLICANT_INCOME_INFO: 0,
            APPLICANT_PERSONAL_INFO: 1,
            APPLICANT_CONTACT_INFO: 2,
            APPLICANT_DISCOVERY_INFO: 3,
            APPLICANT_EMPLOYMENT_INFO: 4,
            APPLICANT_ID_INFO: 5,
            APPLICANT_MAILING_ADDRESS_INFO: 6,
            APPLICANT_NONAPPSPOUSE_INFO: 7,
            APPLICANT_PREVIOUS_ADDRESS_INFO: 8,
            APPLICANT_PREVIOUS_EMP_INFO: 9,
            APPLICANT_RESIDENTIAL_ADDRESS_INFO: 10
        });
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/ApplicantIncome/applicantIncome.directive.js

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

///#source 1 1 /CentralSales/Auto/App/Components/Applicant/ApplicantPersonalInfo/applicantPersonalInfo.directive.js

(function () {

    'use strict';


    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("applicantPersonalInfo", applicantPersonalInfoDirective);

    function applicantPersonalInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/ApplicantPersonalInfo/applicantPersonalInfo.html',
            scope: {
                uidata: '=',
            },
            controller: applicantPersonalInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    applicantPersonalInfoController.$inject = ["staticDataService", "$scope", "navigationService", "helperService", "APPLICANT_CONSTANTS"];

    function applicantPersonalInfoController(staticDataService, $scope, navigationService, helperService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.updateResidentAlien = updateResidentAlien;
        vm.validateDateOfBirth = validateDateOfBirth;
        vm.isValidDateInd = true;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================


        $scope.$on('isScreenInputValid', function () {
            if ($scope.appPersonalInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PERSONAL_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PERSONAL_INFO);
            }
        });

        function initializeDirective() {

            if (vm.uidata == undefined) {
                //todo
                return;
            };
            vm.uidata.middleInitial = (vm.uidata.middleInitial == "") ? "" : vm.uidata.middleInitial.substring(0, 1);
            vm.uidata.directorOrExecutive = (vm.uidata.directorOrExecutive == null) ? "" : vm.uidata.directorOrExecutive;
        };

        //Resident Alien selected based on Country of Citizenship
        function updateResidentAlien() {
            if (vm.uidata != null) {
                if (vm.uidata.countryOfCitizenship == 'US') {
                    vm.uidata.residentAlien = 'N';
                    vm.isResidentAlienInd = false;
                }
                else {
                    vm.uidata.residentAlien = '';
                    vm.isResidentAlienInd = true;
                }
            };
        };

        //Date of Birth format validation

        function validateDateOfBirth() {
            if (helperService.isValidDateOfBirth(vm.uidata.dob) == false) {
                vm.isValidDateInd = false;
            }
            else {
                vm.isValidDateInd = true;
            }
        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/ContactInfo/contactInfo.directive.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("contactInfo", contactInfoDirective);

    function contactInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/ContactInfo/contactInfo.html',
            scope: {
                uidata: '=',
            },
            controller: contactInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    contactInfoController.$inject = ["staticDataService", "disclosureService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];


    function contactInfoController(staticDataService, disclosureService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.showDisclosure = showDisclosure;        

        vm.uidata.homePhone = (vm.uidata.homePhone == undefined) ? "" : vm.uidata.homePhone;
        vm.uidata.cellPhone = (vm.uidata.cellPhone == undefined) ? "" : vm.uidata.cellPhone;
        vm.uidata.workPhone = (vm.uidata.workPhone == undefined) ? "" : vm.uidata.workPhone;

        vm.existingEmail = "";

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.contactInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_CONTACT_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_CONTACT_INFO);
            }
        });

        function initializeDirective() {
            if (vm.uidata == undefined) {
                //do something;
                return;
            };
            //All are straightforward nothing to assign
            vm.existingEmail = vm.uidata.email;
        };

        function showDisclosure() {
            var modifiedEmail = vm.uidata.email;

            if (vm.existingEmail != modifiedEmail) {
                disclosureService.disclosureInput.email = modifiedEmail;
                disclosureService.showDisclosure();
           }
        }        
    };

})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/Discovery/discovery.directive.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("discovery", discoveryDirective);

    function discoveryDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/Discovery/discovery.html',
            scope: {
                uidata: '=',
                disclosureData: '=',
                indicators: '=',
                mainRoutes: '='
            },
            controller: discoveryController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    discoveryController.$inject = ["staticDataService", "viewDataService", "navigationService", "disclosureService", "$scope", "APPLICANT_CONSTANTS"];

    function discoveryController(staticDataService, viewDataService, navigationService, disclosureService, $scope, constants) {



        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.evaluateSourceDropDownValue = evaluateSourceDropDownValue;
        vm.showDisclosureByLanguage = showDisclosureByLanguage;

        vm.disableReservationDropdown = true;
        vm.indicators.disableDisclosure = false;

        var applicant = viewDataService.getApplicant();
        var initialData = viewDataService.storeInitialData();
        var personalInfo = applicant.appPersonalInfo;
        var contactInfo = applicant.contactInfo;
        var residenceAddress = applicant.residentialAddress;

        var currentTab = navigationService.getCurrentRoute();
        var email = contactInfo.email;
        var state = personalInfo.state;


        //=======================================================================================================================
        //  Controller Implementations
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.discoveryForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_DISCOVERY_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_DISCOVERY_INFO);
            }
        });

        function initializeDirective() {
            //.net code behind logic 
            if (vm.uidata == undefined) {
                vm.uidata.languageIndicator = "ENG";
                showDisclosurePopUp("ENG");
            }

            if (vm.mainRoutes[1].routeValue == "coapplicant")
                vm.indicators.disableCoAppSearch = true;

            if (vm.uidata.languageIndicator == "")
                vm.uidata.languageIndicator = "ENG";

            if ((vm.uidata.languageIndicator == "" || vm.uidata.languageIndicator == undefined)
                && ucacsInitialData.requestInfo != undefined && ucacsInitialData.requestInfo.productType != "ELEADS") {

                vm.indicators.disableDisclosure = true;
                vm.uidata.languageIndicator = "ENG";
                showDisclosurePopUp("ENG", residenceAddress.state, contactInfo.email, vm.uidata.source);
                return;
            }

            if (vm.uidata.languageIndicator == "" && ucacsInitialData.requestInfo != undefined && ucacsInitialData.requestInfo.productType == "ELEADS") {

                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp("ENG", residenceAddress.state, contactInfo.email, vm.uidata.source);
            }

            if (vm.uidata.languageIndicator != "") {  //&& need to get the disclosureAcceptanceDateTime) {

                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp(vm.uidata.languageIndicator, residenceAddress.state, contactInfo.email, vm.uidata.source);
            }

            //Js logic 

            //=======================================================================================================================
            // TODO: May be needed for disclosure SCRA
            //=======================================================================================================================
            //  vm.evaluateSourceDropDownValue();

            //Todo: Move to service if needed
            if (ucacsInitialData != null && ucacsInitialData != undefined) {
                var initialData = [];
                vm.initialData = JSON.parse(ucacsInitialData);
            }

        };

        function evaluateSourceDropDownValue() {

            if (vm.uidata.source != "" && vm.uidata != undefined) {

                vm.disableReservationDropdown = (vm.uidata.source == "0033" || vm.uidata.source == "0027") ? false : true;

                //=======================================================================================================================
                //  TODO: Needs the below logic to be implemented
                //=======================================================================================================================


                //if (vm.uidata.source == "0027") {
                //    //To-Do:
                //    //There is logic in the Discovery.js file line 876 to enable disable the validator
                //    //But the code 27 is not there in the drop down.
                //};

                //if (vm.uidata.source == "0002" || vm.uidata.source == "0059" || vm.uidata.source == "0087") {

                //    if (currentTab.routeName.toUpperCase() == 'APPLICANT') {
                //        vm.disclosureData.SCRA = "Y"; //TODO : why this is Y for above source
                //        showDisclosurePopUp(vm.disclosureData.SCRA, state, email, vm.uidata.source);
                //    }
                //}
            }

        };


        function showDisclosureByLanguage() {

            if (vm.uidata.languageIndicator != "") {  //&& need to get the disclosureAcceptanceDateTime) {
                vm.indicators.disableDisclosure = true;
                showDisclosurePopUp(vm.uidata.languageIndicator, residenceAddress.state, contactInfo.email, vm.uidata.source);
            }
        };

        function showDisclosurePopUp(language, state, email, source) {

            disclosureService.disclosureInput.language = language;
            disclosureService.disclosureInput.email = email;
            disclosureService.disclosureInput.state = state;
            disclosureService.disclosureInput.source = source;
            disclosureService.showDisclosure();

            //alert("Show disclousre - Based on the parameter passed \n the disclosure content will be displayed");
        }
    };
})();


///#source 1 1 /CentralSales/Auto/App/Components/Applicant/CoApplicantSearch/paginator.directive.js
(function () {
    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("paginator", paginatorDirective);

    function paginatorDirective() {
        return {
            restrict: 'E',
            controller: function ($scope, Paginator) {
                $scope.paginator = Paginator;
            },
            templateUrl: 'Components/Applicant/CoApplicantSearch/paginator.html'
        };
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).filter("paginate", paginateFilter);

    function paginateFilter(Paginator) {
        return function (input, rowsPerPage) {
            if (!input) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }

            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).filter("forLoop", forLoopFilter);

    function forLoopFilter() {
        return function (input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).service("Paginator", PaginatorService);

    function PaginatorService() {

        this.page = 0;
        this.rowsPerPage = 50;
        this.itemCount = 0;
        this.limitPerPage = 5;

        this.setPage = function (page) {

            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            this.page++;
        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        this.firstPage = function () {
            this.page = 0;
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () {
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };

        this.lowerLimit = function () {
            var pageCountLimitPerPageDiff = this.pageCount() - this.limitPerPage;

            if (pageCountLimitPerPageDiff < 0) {
                return 0;
            }

            if (this.page > pageCountLimitPerPageDiff + 1) {
                return pageCountLimitPerPageDiff;
            }

            var low = this.page - (Math.ceil(this.limitPerPage / 2) - 1);

            return Math.max(low, 0);
        };
    };

}());
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/CoApplicantSearch/coapplicantSearch.directive.js
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
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/EmploymentInfo/employmentInfo.directive.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("employmentInfo", employmentInfoDirective);

    function employmentInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/EmploymentInfo/employmentInfo.html',
            scope: {
                uidata: '=',
                indicators: '=',
                disclosureData:'='
            },
            controller: employmentInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    employmentInfoController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function employmentInfoController(staticDataService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.showHidePreviousEmploymentPanel = showHidePreviousEmploymentPanel;
        vm.enableClose = enableClose;
        vm.openDisclosure = openDisclosure;


        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.employmentInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_EMPLOYMENT_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_EMPLOYMENT_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };

        function showHidePreviousEmploymentPanel() {

            var totalMonths = 0;

            if (vm.uidata.employmentPeriod.years != undefined && (vm.uidata.employmentPeriod.years) != null
                 && (vm.uidata.employmentPeriod.months) != undefined && (vm.uidata.employmentPeriod.months) != null) {
                if (vm.uidata.employmentPeriod.years * 12)
                    totalMonths = parseInt(vm.uidata.employmentPeriod.years * 12);
                if (vm.uidata.employmentPeriod.months)
                    totalMonths += parseInt(vm.uidata.employmentPeriod.months);
            }

            if (totalMonths != 0 && totalMonths < 24) {
                vm.indicators.showPreviousEmployment = true;
            }
            else {
                vm.indicators.showPreviousEmployment = false;
            }
        };

        function openDisclosure() {
            if (vm.uidata.empType == 'MENL') {
                $("#SCRAmodal").modal('show');
            }
        };

        function enableClose() {
            if (vm.disclosureData.SCRA == "N") {
                vm.isReadToCustomer = false;
            }
            else {
                vm.isReadToCustomer = true;
            }
        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/IdInfo/idInfo.directive.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("idInfo", idInfoDirective);

    function idInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/IdInfo/idInfo.html',
            scope: {
                uidata: '='
            },
            controller: idInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    idInfoController.$inject = ["staticDataService", "$scope", "navigationService", "helperService", "APPLICANT_CONSTANTS"];

    function idInfoController(staticDataService, $scope, navigationService, helperService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.validateDate = validateDate;
        vm.isValidDateInd = true;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.idInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_ID_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_ID_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign
        }

        //Date format validation
        function validateDate(inputdate) {            
            if (helperService.isValidDate(inputdate) == false) {
                vm.isValidDateInd = false;
            }
            else {
                vm.isValidDateInd = true;
            }

        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/ResidentialAddress/residentialAddress.directive.js
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("residentialAddress", residentialAddressDirective);

    function residentialAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/residentialAddress/residentialAddress.html',
            scope: {
                applicantData: '=',
                uidata: '=',
                indicators: '='
            },
            controller: residentialAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    residentialAddressController.$inject = ["staticDataService", "disclosureService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function residentialAddressController(staticDataService, disclosureService, $scope, navigationService, constants) {

        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        vm.differentMailingAddress = differentMailingAddress;
        vm.setIndicator = setIndicator;
        vm.onStateChanged = onStateChanged;
        vm.showHidepreviousAddressPanel = showHidepreviousAddressPanel;        

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.residentialAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_RESIDENTIAL_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_RESIDENTIAL_ADDRESS_INFO);
            }
        });

        function initializeDirective() {
            //Note: Permanent Address is nothing but the Residential Address in the UI
            if (vm.uidata == undefined) {
                //do something;
                return;
            };

            vm.applicantData.hideMailingAddress = false;
            vm.applicantData.mailingAddress.streetAddress = vm.uidata.streetAddress;
            vm.applicantData.mailingAddress.aptNumber = vm.uidata.aptNumber;
            vm.applicantData.mailingAddress.city = vm.uidata.city;
            vm.applicantData.mailingAddress.state = vm.uidata.state;
            vm.applicantData.mailingAddress.zip = vm.uidata.zip;

            vm.applicantData.differentMailingAddressInd = (vm.applicantData.differentMailingAddressInd == null) ? "" : vm.applicantData.differentMailingAddressInd;
            vm.applicantData.nonAppSpouseInd = (vm.applicantData.nonAppSpouseInd == null) ? "" : vm.applicantData.nonAppSpouseInd;
        };

        function differentMailingAddress() {

            vm.indicators.hideMailingAddress = vm.applicantData.differentMailingAddressInd;

            if (vm.applicantData.differentMailingAddressInd == "Y") {
                vm.applicantData.mailingAddress.streetAddress = "";
                vm.applicantData.mailingAddress.aptNumber = "";
                vm.applicantData.mailingAddress.city = "";
                vm.applicantData.mailingAddress.state = "";
                vm.applicantData.mailingAddress.zip = "";
                vm.indicators.hideMailingAddress = true;
            };

            if (vm.applicantData.differentMailingAddressInd == "N") {
                vm.applicantData.mailingAddress.streetAddress = vm.uidata.streetAddress;
                vm.applicantData.mailingAddress.aptNumber = vm.uidata.aptNumber;
                vm.applicantData.mailingAddress.city = vm.uidata.city;
                vm.applicantData.mailingAddress.state = vm.uidata.state;
                vm.applicantData.mailingAddress.zip = vm.uidata.zip;
                vm.indicators.hideMailingAddress = false;
            };
        };

        function setIndicator() {
            vm.indicators.nonAppSpouseInd = vm.applicantData.nonAppSpouseInd;
        }

        function showHidepreviousAddressPanel() {

            var totalMonths = 0;

            if (((vm.uidata.timeAtAddress.years) != undefined && (vm.uidata.timeAtAddress.years) != null)
                 && ((vm.uidata.timeAtAddress.months) != undefined && (vm.uidata.timeAtAddress.months) != null)) {
                if (vm.uidata.timeAtAddress.years * 12)
                    totalMonths = parseInt(vm.uidata.timeAtAddress.years * 12);
                if (vm.uidata.timeAtAddress.months)
                    totalMonths += parseInt(vm.uidata.timeAtAddress.months);
            }

            if (totalMonths != 0 && totalMonths < 24) {
                vm.indicators.showPreviousAddress = true;
            }
            else {
                vm.indicators.showPreviousAddress = false;
            }
        };

        function onStateChanged() {
            vm.indicators.residentialState = vm.uidata.state;
            if (vm.uidata.state == "LA") {
                disclosureService.disclosureInput.state = vm.uidata.state;
                disclosureService.showDisclosure();
            }
        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/PreviousAddress/previousAddress.directive.js
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("previousAddress", previousAddressDirective);

    function previousAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/PreviousAddress/previousAddress.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: previousAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    previousAddressController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function previousAddressController(staticDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.previousAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PREVIOUS_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PREVIOUS_ADDRESS_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/MailingAddress/mailingAddress.directive.js
(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("mailingAddress", mailingAddressDirective);

    function mailingAddressDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/MailingAddress/mailingAddress.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: mailingAddressController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    mailingAddressController.$inject = ["staticDataService", "viewDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function mailingAddressController(staticDataService, viewDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;

        var applicant = viewDataService.getApplicant();
        var residentialAddress = applicant.residentialAddress;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.mailingAddressForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_MAILING_ADDRESS_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_MAILING_ADDRESS_INFO);
            }
        });

        function initializeDirective() {

            vm.uidata.streetAddress = residentialAddress.streetAddress;
            vm.uidata.aptNumber = residentialAddress.aptNumber;
            vm.uidata.city = residentialAddress.city;
            vm.uidata.state = residentialAddress.state;
            vm.uidata.zip = residentialAddress.zip;
        }
    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/NonApplicantSpouseInfo/nonApplicantSpouseInfo.directive.js


(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("nonApplicantSpouseInfo", nonApplicantSpouseInfoDirective);

    function nonApplicantSpouseInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/nonApplicantSpouseInfo/nonApplicantSpouseInfo.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: nonApplicantSpouseInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    nonApplicantSpouseInfoController.$inject = ["staticDataService", "viewDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function nonApplicantSpouseInfoController(staticDataService, viewDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;
        
        var applicant = viewDataService.getApplicant();
        var personalInfo = applicant.appPersonalInfo;
        var contactInfo = applicant.contactInfo;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.nonApplicantSpouseInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_NONAPPSPOUSE_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_NONAPPSPOUSE_INFO);
            }
        });

        function initializeDirective() {

            if (vm.uidata == undefined) {
                vm.uidata.nonSpouseInfo.nonAppOutsideUS = "";
            }

            vm.uidata.nonAppOutsideUS = (vm.uidata.nonAppOutsideUS == null) ? "" : vm.uidata.nonAppOutsideUS;
        };

    };
})();
///#source 1 1 /CentralSales/Auto/App/Components/Applicant/PreviousEmploymentInfo/previousEmploymentInfo.directive.js

(function () {

    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("previousEmploymentInfo", previousEmploymentInfoDirective);

    function previousEmploymentInfoDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'Components/Applicant/previousEmploymentInfo/previousEmploymentInfo.html',
            scope: {
                uidata: '=',
                indicators: '='
            },
            controller: previousEmploymentInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    previousEmploymentInfoController.$inject = ["staticDataService", "$scope", "navigationService", "APPLICANT_CONSTANTS"];

    function previousEmploymentInfoController(staticDataService, $scope, navigationService, constants) {
        //=======================================================================================================================
        //  Controller Member(s) Definitions 
        //=======================================================================================================================

        var vm = this;
        vm.staticData = staticDataService.dropDownValues;
        vm.initializeDirective = initializeDirective;

        //=======================================================================================================================
        //  Controller Member(s) Implementations 
        //=======================================================================================================================

        $scope.$on('isScreenInputValid', function () {
            if ($scope.previousEmploymentInfoForm.$valid == false) {
                vm.formsubmit = true;
                navigationService.canNavigate(false, constants.APPLICANT_PREVIOUS_EMP_INFO);
            } else {
                vm.formsubmit = false;
                navigationService.canNavigate(true, constants.APPLICANT_PREVIOUS_EMP_INFO);
            }
        });

        function initializeDirective() {

            //All are straightforward nothing to assign

            //Apply validation for phone numbers
        };
    };
})();
