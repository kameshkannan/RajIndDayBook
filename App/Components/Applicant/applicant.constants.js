
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